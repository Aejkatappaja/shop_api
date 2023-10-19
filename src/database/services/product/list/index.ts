import Product from '../../../../database/models/product.model';
import { IProduct } from '../../../../types/product.type';

const getAllProducts = async (): Promise<IProduct[]> => {
  try {
    const products = await Product.find().sort({ brand: 1 });
    return products;
  } catch (error) {
    console.error('Error during products fetching process :', error);
    throw error;
  }
};

const product_get_all_services = {
  getAllProducts,
};

export default product_get_all_services;
