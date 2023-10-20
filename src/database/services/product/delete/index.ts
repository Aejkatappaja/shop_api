import Product from '../../../../database/models/product.model';

export const deleteProduct = async (id: string): Promise<boolean | null> => {
  try {
    if (!id) {
      return false;
    } else {
      const productDeleted = await Product.findByIdAndDelete(id);
      if (!productDeleted) {
        return null;
      } else return true;
    }
  } catch (error: unknown) {
    console.error('Error during delete product process :', error);
    throw error;
  }
};

const product_delete_by_id_services = {
  deleteProduct,
};

export default product_delete_by_id_services;
