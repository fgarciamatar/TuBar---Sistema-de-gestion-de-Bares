import { AppError } from '../models';
import { Transaction } from 'sequelize';
import { OrderDetailModel } from '../database/models';
import { OrderDetailProps } from '../interfaces';
import ProductService from './product.services';
import { billOrderService } from '.';
// import BillOrderService from './billOrder.services';
const productService = new ProductService();
class OrderDetailService {
  constructor() {}

  async createManyOrders(
    billOrderId: number,
    barId: number,
    orderDetails: OrderDetailProps[],
    t: Transaction
  ) {
    let totalPrice = 0;
    const creatOrderDetailsPromises = orderDetails.map(
      async ({ quantity, productId }) => {
        const product = await productService.findProductForBarOr404(
          productId,
          barId
        );
        totalPrice += product.price * quantity;
        const orderDetail = await OrderDetailModel.create(
          {
            productId,
            quantity,
            billOrderId,
            price: product.price,
          },
          { transaction: t }
        );
        return orderDetail;
      }
    );
    const OrderDetails = await Promise.all(creatOrderDetailsPromises);
    return { totalPrice, OrderDetails };
  }
  async findOrderOr404(orderId: number) {
    const order = await OrderDetailModel.findOne({
      where: {
        id: orderId,
      },
    });
    if (!order)
      throw new AppError(
        'No se encontró ninguna Orden con el ID especificado.',
        404
      );
    return order;
  }
  async getTotalPriceOrderForBar() {}
  async updateOrderForBar(
    orderId: number,
    barId: number,
    { description, quantity }: OrderDetailProps
  ) {
    const order = await this.findOrderOr404(orderId);
    await billOrderService.findBillOrderForOrderInBar(order.billOrderId, barId);
    await order.update({ description, quantity });
    await billOrderService.updateTotalPriceInBillOrder(order.billOrderId);
    return order;
  }
  async removeOrderForBar(orderId: number, barId: number) {
    const order = await this.findOrderOr404(orderId);
    await billOrderService.findBillOrderForOrderInBar(order.billOrderId, barId);
    await order.destroy();
    await billOrderService.updateTotalPriceInBillOrder(order.billOrderId);
    return order;
  }
}
export default OrderDetailService;
