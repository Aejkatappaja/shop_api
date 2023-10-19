import { IProduct } from '../../../../types/product.type';
import Product from '../../../../database/models/product.model';

export const newProductCreation = async (productInfos: IProduct): Promise<IProduct | null> => {
  try {
    if (!productInfos) {
      return null;
    } else {
      const newProduct = new Product(productInfos);
      await newProduct.save();
      return newProduct;
    }
  } catch (error) {
    console.error('Error during product creation process :', error);
    throw error;
  }
};
