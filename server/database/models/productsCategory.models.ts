import { DataTypes, Optional } from 'sequelize';
import db from '../db';
import { ProductsCategoryAttributes } from '../../interfaces';
import BarModel from './bar.models';

const ProductsCategoryModel = db.define<ProductsCategoryAttributes>('productsCategories', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo 'name' es obligatorio y debe ser proporcionado.",
      },
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo 'description' es obligatorio y debe ser proporcionado.",
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

export default ProductsCategoryModel;
