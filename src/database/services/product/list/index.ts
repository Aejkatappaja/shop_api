import Product from '../../../../database/models/product.model';
import { IProduct } from '../../../../types/product.type';

const getAllProducts = async (): Promise<IProduct[] | null> => {
  try {
    const products = await Product.find().sort({ brand: 1 });
    if (!products) {
      return null;
    } else return products;
  } catch (error: unknown) {
    console.error('Error during products fetching process :', error);
    throw error;
  }
};

const product_get_all_services = {
  getAllProducts,
};

export default product_get_all_services;
