import { DataTypes, Optional } from 'sequelize';
import db from '../db';
import { OrdersDetailAttributes } from '../../interfaces';
import OrderModel from './order.models';
import ProductModel from './product.models';

const OrdersDetailModel = db.define<OrdersDetailAttributes>('ordersDetails', {
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: OrderModel, 
      key: 'id', 
    },
    validate: {
      notNull: {
        msg: "El campo 'orderId' es obligatorio y debe ser proporcionado.",
      },
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ProductModel, 
      key: 'id', 
    },
    validate: {
      notNull: {
        msg: "El campo 'productId' es obligatorio y debe ser proporcionado.",
      },
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo 'quantity' es obligatorio y debe ser proporcionado.",
      },
    },
  },
});

export default OrdersDetailModel;
