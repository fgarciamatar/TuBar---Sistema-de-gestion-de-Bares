import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  Optional,
} from 'sequelize';
import { ModelSequlize } from './types';

export interface ProductsCategoryAttributes extends ModelSequlize<ProductsCategoryAttributes> {
  id?: CreationOptional<number>;
  name: string;
  barId: number;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}

export type ProductsCategoryProps = Pick<
  ProductsCategoryAttributes,
  'name' | 'bar_id'
>;
