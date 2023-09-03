import Product from '../models/product.model';
import { IProduct } from '../types/product.type';

export const Create = async (productInfos: IProduct): Promise<IProduct> => {
  const newProduct = new Product(productInfos);
  await newProduct.save();
  return newProduct;
};

export const AlreadyExists = async (productInfos: IProduct): Promise<IProduct | boolean> => {
  const existingProduct = await Product.findOne({ name: productInfos.name });
  if (existingProduct) {
    return true;
  }
  return false;
};

export const WrongQuantity = async (productInfos: IProduct): Promise<IProduct | boolean> => {
  if (productInfos.quantity <= 0) {
    return true;
  }
  return false;
};

export const MissingInfos = async (productInfos: IProduct): Promise<IProduct | boolean> => {
  if (
    !productInfos.brand ||
    !productInfos.name ||
    !productInfos.price ||
    !productInfos.quantity ||
    !productInfos.description
  ) {
    return true;
  }
  return false;
};

export const getProductId = (id: string): Promise<IProduct> => Product.findById(id);

const productService = {
  Create,
  AlreadyExists,
  WrongQuantity,
  MissingInfos,
  getProductId,
};

export default productService;
