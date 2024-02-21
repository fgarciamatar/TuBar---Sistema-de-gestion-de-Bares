import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  Optional,
} from 'sequelize';
import { ModelSequlize } from './types';

export interface PerfilAttributes extends ModelSequlize<PerfilAttributes> {
  id?: CreationOptional<number>;
  name: string;
  rol: string;
  bar_id: number;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}

export type PerfilProps = Pick<
  PerfilAttributes,
  'name' | 'rol' | 'bar_id'
>;
