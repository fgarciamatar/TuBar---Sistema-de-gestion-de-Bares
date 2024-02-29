import db from '../database/db';
import {
  BillOrderModel,
  OrderDetailModel,
  ProductModel,
} from '../database/models';
import { BillOrderProps, OrderDetailProps } from '../interfaces';
import { AppError } from '../models';
import OrderDetailService from './orderDetail.services';
import ProfileService from './profile.services';
import TableService from './table.services';
import Sequelize from 'sequelize';

const tableService = new TableService();
const profileService = new ProfileService();
const orderDetailService = new OrderDetailService();

class BillOrderService {
  constructor() {}

  async findBillOrdersForBar(barId: number) {
    const profileIds = await profileService.profileIdsForBar(barId);
    const billOrders = await BillOrderModel.findAll({
      where: {
        profileId: { [Sequelize.Op.in]: profileIds },
      },
      include: {
        model: OrderDetailModel,
        include: [
          {
            model: ProductModel,
          },
        ],
      },
    });
    return billOrders;
  }

  async createBillOrderForBar(
    barId: number,
    { profileId, tableId }: BillOrderProps,
    orderDetails: OrderDetailProps[]
  ) {
    await tableService.findTableForBarOr404(barId, tableId);
    const t = await db.transaction();
    const billOrder = await BillOrderModel.create(
      {
        profileId,
        tableId,
      },
      { transaction: t }
    );
    const OrderDetails = await orderDetailService.createManyOrders(
      billOrder.id,
      barId,
      orderDetails,
      t
    );
    await billOrder.update(
      { total: OrderDetails.totalPrice },
      { transaction: t }
    );
    await t.commit();
    return billOrder;
  }

  async addOrderInBillOrderForBar(
    billOrderId: number,
    barId: number,
    orderDetails: OrderDetailProps[]
  ) {
    const t = await db.transaction();
    const billOrder = await this.findBillOrderForBarOr404(billOrderId, barId);
    const OrderDetails = await orderDetailService.createManyOrders(
      billOrder.id,
      barId,
      orderDetails,
      t
    );
    billOrder.total += OrderDetails.totalPrice;
    await billOrder.save({ transaction: t });
    await t.commit();
    return billOrder;
  }

  async findBillOrderOr404(billOrderId: number) {
    const billOrder = await BillOrderModel.findOne({
      where: {
        id: billOrderId,
      },
    });
    if (!billOrder)
      throw new AppError(
        'No se encontró ningun factura con el ID especificado.',
        404
      );
    return billOrder;
  }

  async findBillOrderForBarOr404(billOrderId: number, barId: number) {
    const billOrder = await this.findBillOrderOr404(billOrderId);
    const findBillOrderInProfile = await profileService.findProfileForBar(
      billOrder.profileId,
      barId
    );
    if (!findBillOrderInProfile)
      throw new AppError(
        'No se encontró ningun factura en el bar con el ID especificado.',
        404
      );
    return billOrder;
  }

  async payBillOrder(billOrderId: number, barId: number) {
    const billOrder = await this.findBillOrderForBarOr404(billOrderId, barId);
    billOrder.update({ isBilled: true });
    return billOrder;
  }
}

export default BillOrderService;
