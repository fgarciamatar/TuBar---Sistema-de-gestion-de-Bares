import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  Optional,
} from 'sequelize';
import { ModelSequlize, Role } from './types';

export interface ProfileAttributes extends ModelSequlize<ProfileAttributes> {
  id?: CreationOptional<number>;
  name: string;
  role: CreationOptional<Role>;
  pinCode: string;
  barId: string;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}
