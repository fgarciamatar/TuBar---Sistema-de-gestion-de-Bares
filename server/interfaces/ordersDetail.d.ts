import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  Optional,
} from 'sequelize';
import { ModelSequlize } from './types';

export interface OrdersDetailAttributes extends ModelSequlize<OrdersDetailAttributes> {
  id?: CreationOptional<number>;
  orderId: number;
  productId: number;
  quantity: number;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}

export type OrdersDetailProps = Pick<
  OrdersDetailAttributes,
  'tableNumber' | 'ability' | 'location' | 'orderId'
>;
