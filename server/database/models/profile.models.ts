import { DataTypes } from 'sequelize';
import { ProfileAttributes } from '../../interfaces/profile';
import db from '../db';
import BarModel from './bar.models';

const ProfileModel = db.define<ProfileAttributes>('profiles', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo 'name' es obligatorio y debe ser proporcionado.",
      },
    },
  },
  role: {
    type: DataTypes.ENUM('ADMIN', 'EMPLOYEE'),
    defaultValue: 'EMPLOYEE',
    allowNull: false,
    validate: {
      isIn: {
        args: [['ADMIN', 'EMPLOYEE']],
        msg: "Tipo de role inválido. Por favor, seleccione entre 'ADMIN' o 'EMPLOYEE'.",
      },
      notNull: {
        msg: "El campo 'role' es obligatorio y debe ser proporcionado.",
      },
    },
  },
  pinCode: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo 'pinCode' es obligatorio y debe ser proporcionado.",
      },
    },
  },
  barId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: BarModel,
      key: 'id',
    },
    validate: {
      notNull: {
        msg: "El campo 'barId' es obligatorio y debe ser proporcionado.",
      },
    },
  },
});

export default ProfileModel;
