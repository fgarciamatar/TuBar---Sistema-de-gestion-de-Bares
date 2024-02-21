import { DataTypes, Optional } from 'sequelize';
import db from '../db';
import { PerfilAttributes } from '../../interfaces';
import BarModel from './bar.models';


type PerfilCreationAttributes = Optional<
  PerfilAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;

const PerfilModel = db.define<PerfilAttributes>('perfiles', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo 'nombre' es obligatorio y debe ser proporcionado.",
      },
    },
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo 'rol' es obligatorio y debe ser proporcionado.",
      },
    },
  },
  bar_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: BarModel, 
      key: 'id', 
    },
    validate: {
      notNull: {
        msg: "El campo 'bar_id' es obligatorio y debe ser proporcionado.",
      },
    },
  },
});

export default PerfilModel;
