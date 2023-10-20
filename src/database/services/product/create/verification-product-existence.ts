import Product from '../../../../database/models/product.model';
import { IProduct } from '../../../../types/product.type';

export const productAlreadyExists = async (name: string): Promise<IProduct | boolean> => {
  try {
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return true;
    }
    return false;
  } catch (error: unknown) {
    console.error('Error during product already exists process :', error);
    throw error;
  }
};
