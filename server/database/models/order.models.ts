import { DataTypes, Optional } from 'sequelize';
import db from '../db';
import { OrderAttributes } from '../../interfaces';
import ProfileModel from './profile.models';
import TableModel from './table.models';

const OrderModel = db.define<OrderAttributes>('orders', {
  profileId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ProfileModel, 
      key: 'id', 
    },
    validate: {
      notNull: {
        msg: "El campo 'profileId' es obligatorio y debe ser proporcionado.",
      },
    },
  },
  tableId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TableModel, 
      key: 'id', 
    },
    validate: {
      notNull: {
        msg: "El campo 'tableId' es obligatorio y debe ser proporcionado.",
      },
    },
  },
});

export default OrderModel;
