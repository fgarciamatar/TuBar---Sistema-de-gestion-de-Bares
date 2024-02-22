import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  Optional,
} from 'sequelize';
import { ModelSequlize } from './types';

export interface BillAttributes extends ModelSequlize<BillAttributes> {
  id?: CreationOptional<number>;
  billNumber: string;
  createdAt?: CreationOptional<Date>;
  total: number;
  profileId: number;
  updatedAt?: CreationOptional<Date>;
}

export type BillProps = Pick<
  BillAttributes,
  'billNumber' | 'total' | 'profileId'
>;
