import { Document, Types } from 'mongoose';
import { IProduct } from 'types/product.type';

export interface ICategory extends Document {
  name: string;
  products: Types.Array<IProduct[]>;
}
