import { DataTypes, Optional } from 'sequelize';
import db from '../db';
import { BarAttributes } from '../../interfaces';

type BarCreationAttributes = Optional<
  BarAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;

const BarModel = db.define<BarAttributes>('bars', {
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo 'password' es obligatorio y debe ser proporcionado.",
      },
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo 'name' es obligatorio y debe ser proporcionado.",
      },
    },
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo 'userName' es obligatorio y debe ser proporcionado.",
      },
    },
    unique: {
      name: 'userName',
      msg: 'Este dato tiene que ser unico.',
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'Asegurese de escribir un correo electronico valido.',
      },
      notNull: {
        msg: "El campo 'email' es obligatorio y debe ser proporcionado.",
      },
    },
    unique: {
      msg: 'Este dato tiene que ser unico.',
      name: 'email',
    },
  },
});

export default BarModel;
