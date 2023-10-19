import Product from '../../../../database/models/product.model';
import { IProduct } from '../../../../types/product.type';

export const getProductById = async (id: string): Promise<IProduct> => {
  try {
    const product = await Product.findById(id);
    return product;
  } catch (error) {
    console.error('Error during fetching productId process :', error);
    throw error;
  }
};

const product_get_by_id_services = {
  getProductById,
};

export default product_get_by_id_services;
