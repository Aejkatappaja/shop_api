import Product from '../models/product.model';
import { IProduct } from '../types/product.type';

export const CreateNewProduct = async (productInfos: IProduct): Promise<IProduct> => {
  const newProduct = new Product(productInfos);
  await newProduct.save();
  return newProduct;
};

export const ExistingProduct = async (productInfos: IProduct): Promise<IProduct | boolean> => {
  const existingProduct = await Product.findOne({ name: productInfos.name });
  if (existingProduct) {
    return true;
  }
  return false;
};

export const WrongProductQuantity = async (productInfos: IProduct): Promise<IProduct | boolean> => {
  if (productInfos.quantity <= 0) {
    return true;
  }
  return false;
};

export const MissingProductInfos = async (productInfos: IProduct): Promise<IProduct | boolean> => {
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
