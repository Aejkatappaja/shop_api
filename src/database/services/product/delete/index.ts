import Product from '../../../../database/models/product.model';

export const deleteProduct = async (id: string): Promise<boolean | null> => {
  try {
    if (!id) {
      return false;
    } else {
      await Product.findByIdAndDelete(id);
      return true;
    }
  } catch (error) {
    console.error('Error during fetching productId process :', error);
    throw error;
  }
};

const product_delete_by_id_services = {
  deleteProduct,
};

export default product_delete_by_id_services;
