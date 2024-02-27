import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  Optional,
} from 'sequelize';
import { ModelSequlize } from './types';

export interface BillOrderAttributes
  extends ModelSequlize<BillOrderAttributes> {
  id?: CreationOptional<number>;
  total: number;
  isBilled: CreationOptional<boolean>;
  profileId: number;
  tableId: number;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}

export type BillOrderProps = Pick<
  BillOrderAttributes,
  'total' | 'profileId' | 'tableId'
>;
