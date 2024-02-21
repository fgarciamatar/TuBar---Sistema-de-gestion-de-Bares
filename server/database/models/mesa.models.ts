import { DataTypes, Optional } from 'sequelize';
import db from '../db';
import { MesaAttributes } from '../../interfaces';
import BarModel from './bar.models';


type MesaCreationAttributes = Optional<
  MesaAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;

const MesaModel = db.define<MesaAttributes>('mesas', {
  numero_mesa: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo 'numero_mesa' es obligatorio y debe ser proporcionado.",
      },
    },
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo 'capacidad' es obligatorio y debe ser proporcionado.",
      },
    },
  },
  ubicacion: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo 'ubicacion' es obligatorio y debe ser proporcionado.",
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

export default MesaModel;
