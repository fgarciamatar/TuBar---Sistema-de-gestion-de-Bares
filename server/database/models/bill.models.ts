import { DataTypes, Optional } from 'sequelize';
import db from '../db';
import { BillAttributes } from '../../interfaces';
import ProfileModel from './profile.models';

const BillModel = db.define<BillAttributes>('bills', {
  billNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo 'billNumber' es obligatorio y debe ser proporcionado.",
      },
    },
  },
  total: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo 'total' es obligatorio y debe ser proporcionado.",
      },
    },
  },
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
});

export default BillModel;
