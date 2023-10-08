import { Document, Types } from 'mongoose';
import { IProduct } from './product.type';
import { IUser } from './user.type';

export interface ITransaction extends Document {
  order: Types.Array<IProduct>;
  customer: IUser;
  total: number;
  date: Date;
}
