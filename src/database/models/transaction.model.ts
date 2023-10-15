import mongoose, { Model, Schema } from 'mongoose';
import { IProduct } from 'types/product.type';
import { ITransaction } from 'types/transaction.type';

export interface ITransactionModel extends ITransaction, Document {}

const transactionSchema = new mongoose.Schema({
  order: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
  customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  total: { type: Number, required: true },
  createdAt: { type: Date, required: true, default: Date.now() },
});

const Product: Model<IProduct> = mongoose.model<IProduct>('Product', transactionSchema);

export default Product;
