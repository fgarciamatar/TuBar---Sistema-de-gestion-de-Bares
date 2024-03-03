import { DataTypes, Optional } from 'sequelize';
import db from '../db';
import { ProductAttributes } from '../../interfaces';
import ProductCategoryModel from './productCategory.models';

const ProductModel = db.define<ProductAttributes>('product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo 'name' es obligatorio y debe ser proporcionado.",
      },
    },
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo 'price' es obligatorio y debe ser proporcionado.",
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
  productCategoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ProductCategoryModel, 
      key: 'id', 
    },
    validate: {
      notNull: {
        msg: "El campo 'productCategoryId' es obligatorio y debe ser proporcionado.",
      },
    },
  },
});

export default ProductModel;
