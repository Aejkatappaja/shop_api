import Product from '../../../../database/models/product.model';
import { IProduct } from '../../../../types/product.type';

const getAllProducts = async (
  page?: number,
  query?: string,
): Promise<{ products: IProduct[]; total: number } | null> => {
  try {
    const perPage = 5;
    const skip = (page - 1) * perPage;
    const total = await Product.countDocuments();
    let filter;
    if (query) {
      filter = {
        $or: [{ brand: { $regex: query, $options: 'i' } }, { name: { $regex: query, $options: 'i' } }],
      };
    }
    const products = await Product.find(filter)
      .sort({ brand: 1 })
      .skip(skip)
      .limit(page ? perPage : null)
      .select('-__v');
    if (!products) {
      return null;
    } else {
      return { products, total };
    }
  } catch (error: unknown) {
    console.error('Error during products fetching process :', error);
    throw error;
  }
};

const product_get_all_services = {
  getAllProducts,
};

export default product_get_all_services;
