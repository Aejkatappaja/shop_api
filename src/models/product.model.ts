import mongoose, { Model } from 'mongoose';
import { IProduct } from 'types/product.type';
import SKU from '../utils/sku-generator';

export interface IProductModel extends IProduct, Document {}

const productSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  picture: { type: String, default: null },
  quantity: { type: Number, required: true },
  description: { type: String, required: true },
  sku: { type: Number, required: true, default: SKU, unique: true },
  created: { type: Date, required: true, default: Date.now() },
});

const Product: Model<IProduct> = mongoose.model<IProduct>('Product', productSchema);

export default Product;
