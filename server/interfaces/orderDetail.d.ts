import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  Optional,
} from 'sequelize';
import { ModelSequlize } from './types';

export interface OrderDetailAttributes
  extends ModelSequlize<OrderDetailAttributes> {
  id?: CreationOptional<number>;
  productId: number;
  quantity: number;
  billOrderId: number;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}

export type OrderDetailProps = Pick<
  OrderDetailAttributes,
  'tableNumber' | 'ability' | 'location' | 'orderId'
>;
