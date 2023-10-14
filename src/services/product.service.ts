import Product from '../models/product.model';
import { IProduct } from '../types/product.type';

export const Create = async (productInfos: IProduct): Promise<IProduct> => {
  try {
    const newProduct = new Product(productInfos);
    await newProduct.save();
    return newProduct;
  } catch (error) {
    console.error('Error during product creation process :', error);
    throw error;
  }
};

export const AlreadyExists = async (productInfos: IProduct): Promise<IProduct | boolean> => {
  try {
    const existingProduct = await Product.findOne({ name: productInfos.name });
    if (existingProduct) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error during product already exists process :', error);
    throw error;
  }
};

export const WrongQuantity = async (productInfos: IProduct): Promise<IProduct | boolean> => {
  try {
    if (productInfos.quantity <= 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error during quantity verification input process :', error);
    throw error;
  }
};

export const MissingInfos = async (productInfos: IProduct): Promise<IProduct | boolean> => {
  try {
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
  } catch (error) {
    console.error('Error during infos verification process :', error);
    throw error;
  }
};

export const getProductId = async (id: string): Promise<IProduct> => {
  try {
    const product = await Product.findById(id);
    return product;
  } catch (error) {
    console.error('Error during fetching productId process :', error);
    throw error;
  }
};

export const getAllProducts = async (): Promise<IProduct[]> => {
  try {
    const products = await Product.find().sort({ brand: 1 });
    return products;
  } catch (error) {
    console.error('Error during infos verification process :', error);
    throw error;
  }
};

const productService = {
  Create,
  AlreadyExists,
  WrongQuantity,
  MissingInfos,
  getProductId,
  getAllProducts,
};

export default productService;
