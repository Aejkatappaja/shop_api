import mongoose, { Model, Schema } from 'mongoose';
import { ICategory } from 'types/category.type';

const categorySchema: Schema = new Schema({
  name: { type: String, required: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  createdAt: { type: Date, required: true, default: Date.now() },
});

const Category: Model<ICategory> = mongoose.model<ICategory>('Category', categorySchema);

export default Category;
