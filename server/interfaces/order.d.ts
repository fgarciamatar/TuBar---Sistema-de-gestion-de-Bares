import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  Optional,
} from 'sequelize';
import { ModelSequlize } from './types';

export interface OrderAttributes extends ModelSequlize<OrderAttributes> {
  id?: CreationOptional<number>;
  createdAt?: CreationOptional<Date>;
  profileId: number;
  tableId: number;
  updatedAt?: CreationOptional<Date>;
}

export type OrderProps = Pick<
  OrderAttributes,
  'tableNumber' | 'ability' | 'location' | 'bar_id'
>;
