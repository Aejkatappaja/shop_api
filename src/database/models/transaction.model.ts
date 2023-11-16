import mongoose, { Model, Schema } from 'mongoose';
import { ITransaction } from 'types/transaction.type';

const transactionSchema = new mongoose.Schema({
  order: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
  customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  total: { type: Number, required: false },
  createdAt: { type: Date, required: true, default: Date.now() },
});

const Product: Model<ITransaction> = mongoose.model<ITransaction>('Transaction', transactionSchema);

export default Product;
