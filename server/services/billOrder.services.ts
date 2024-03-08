import db from '../database/db';
import {
  BillOrderModel,
  OrderDetailModel,
  ProductModel,
} from '../database/models';
import {
  BillOrderAttributes,
  BillOrderProps,
  OrderDetailProps,
} from '../interfaces';
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
      order: [['createdAt', 'ASC']],
    });

    const billOrdersTransform = billOrders.map((billOrder, i) => ({
      ...billOrder.get(),
      billOrderNumber: String(i + 1).padStart(7, '0'),
    }));
    return billOrdersTransform.reverse();
  }
  async updateTotalPriceInBillOrder(billOrderId: number) {
    const billOrder = await BillOrderModel.findOne({
      where: {
        id: billOrderId,
      },
      include: {
        model: OrderDetailModel,
      },
    });
    if (!billOrder)
      throw new AppError(
        'No se encontró ningun factura con el ID especificado.',
        404
      );
    const totalPricerOrder =
      billOrder.orderDetails?.reduce(
        (acc, { price, quantity }) => (acc += price * quantity),
        0
      ) ?? 0;
    await billOrder.update({ total: totalPricerOrder });
    return billOrder;
  }

  async createBillOrderForBar(
    barId: number,
    { profileId, tableId }: BillOrderProps,
    orderDetails: OrderDetailProps[]
  ) {
    const table = await tableService.findTableForBarOr404(tableId, barId);
    const billOrderActive = await BillOrderModel.findOne({
      where: {
        isBilled: false,
        isDelivered: false,
        isCooked: false,
        tableId: table.id,
      },
    });
    if (billOrderActive)
      throw new AppError(
        'Ya hay una factura activa en el sistema. Completa  la factura actual antes de crear una nueva.',
        409
      );
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
    await billOrder.increment(
      { total: +OrderDetails.totalPrice },
      { transaction: t }
    );
    await table.update({ isOccupied: true }, { transaction: t });
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
    if (billOrder.isBilled)
      throw new AppError(
        'Esta factura ya se pagó, no se puede agregar mas ordenes.',
        409
      );
    const OrderDetails = await orderDetailService.createManyOrders(
      billOrder.id,
      barId,
      orderDetails,
      t
    );
    await billOrder.increment(
      { total: OrderDetails.totalPrice },
      { transaction: t }
    );
    await t.commit();
    return billOrder;
  }
  async addOrCreateOrderInBillOrderForBar(
    tableId: number,
    barId: number,
    profileId: number,
    orderDetails: OrderDetailProps[]
  ) {
    const table = await tableService.findTableForBarOr404(tableId, barId);
    const billOrderByTableByProfile = await BillOrderModel.findOne({
      where: {
        tableId: table.id,
        isBilled: false,
        isDelivered: false,
        isCooked: false,
      },
      include: {
        model: OrderDetailModel,
      },
    });
    if (billOrderByTableByProfile) {
      const billOrder = await this.addOrderInBillOrderForBar(
        billOrderByTableByProfile.id,
        barId,
        orderDetails
      );
      return billOrder;
    } else {
      const billOrder = await this.createBillOrderForBar(
        barId,
        { profileId, tableId },
        orderDetails
      );
      return billOrder;
    }
  }

  async findBillOrderOr404(billOrderId: number) {
    const billOrder = await BillOrderModel.findOne({
      where: {
        id: billOrderId,
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

  async findBillOrderForOrderInBar(billOrderId: number, barId: number) {
    const billOrder = await this.findBillOrderOr404(billOrderId);
    const findBillOrderInTable = await tableService.findTableForBar(
      billOrder.tableId,
      barId
    );
    if (!findBillOrderInTable)
      throw new AppError(
        'No se encontró ningun Orden en el bar con el ID especificado.',
        404
      );

    return billOrder;
  }

  async getBillOrderWithBillOrderNumber(
    billOrder: BillOrderAttributes,
    barId: number
  ) {
    const profileIds = await profileService.profileIdsForBar(barId);
    const { count } = await BillOrderModel.findAndCountAll({
      order: [['createdAt', 'ASC']],
      where: {
        profileId: { [Sequelize.Op.in]: profileIds },
        createdAt: { [Sequelize.Op.lte]: billOrder.createdAt },
      },
    });
    return {
      ...billOrder.get(),
      billOrderNumber: String(count).padStart(7, '0'),
    };
  }

  async findBillOrderForBar(billOrderId: number, barId: number) {
    const billOrder = await this.findBillOrderForBarOr404(billOrderId, barId);
    const billOrderWithBillOrderNumber =
      await this.getBillOrderWithBillOrderNumber(billOrder, barId);
    return billOrderWithBillOrderNumber;
  }
  async findBillOrderByTableForBar(tableId: number, barId: number) {
    const table = await tableService.findTableForBarOr404(tableId, barId);
    const billOrderByTable = await BillOrderModel.findOne({
      where: {
        tableId: table.id,
        isBilled: false,
        isDelivered: false,
        isCooked: false,
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
    if (!billOrderByTable) return billOrderByTable;
    await this.findBillOrderForBarOr404(billOrderByTable.id, barId);
    const billOrderWithBillOrderNumber =
      await this.getBillOrderWithBillOrderNumber(billOrderByTable, barId);
    return billOrderWithBillOrderNumber;
  }

  async payBillOrder(billOrderId: number, barId: number) {
    const billOrder = await this.findBillOrderForBarOr404(billOrderId, barId);
    billOrder.update({ isBilled: true });
    await tableService.IsOrNotOccupiedTableForBar(billOrder.tableId, barId);
    const billOrderWithBillOrderNumber =
      await this.getBillOrderWithBillOrderNumber(billOrder, barId);
    return billOrderWithBillOrderNumber;
  }

  async deliverBillOrder(billOrderId: number, barId: number) {
    const billOrder = await this.findBillOrderForBarOr404(billOrderId, barId);
    billOrder.update({ isDelivered: true });
    await tableService.IsOrNotOccupiedTableForBar(billOrder.tableId, barId);
    const billOrderWithBillOrderNumber =
      await this.getBillOrderWithBillOrderNumber(billOrder, barId);
    return billOrderWithBillOrderNumber;
  }

  async cookBillOrder(billOrderId: number, barId: number) {
    const billOrder = await this.findBillOrderForBarOr404(billOrderId, barId);
    billOrder.update({ isCooked: true });
    await tableService.IsOrNotOccupiedTableForBar(billOrder.tableId, barId);
    const billOrderWithBillOrderNumber =
      await this.getBillOrderWithBillOrderNumber(billOrder, barId);
    return billOrderWithBillOrderNumber;
  }
}

export default BillOrderService;
