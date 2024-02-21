import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  Optional,
} from 'sequelize';
import { ModelSequlize } from './types';

export interface MesaAttributes extends ModelSequlize<MesaAttributes> {
  id?: CreationOptional<number>;
  numero_mesa: number;
  capacidad: number;
  ubicacion: string;
  bar_id: number;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}

export type MesaProps = Pick<
  MesaAttributes,
  'numero_mesa' | 'capacidad' | 'ubicacion' | 'bar_id'
>;
