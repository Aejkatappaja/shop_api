import { IProduct } from '../../../../types/product.type';

export const wrongQuantity = async (quantity: number): Promise<IProduct | boolean> => {
  try {
    if (quantity <= 0) {
      return true;
    }
    return false;
  } catch (error: unknown) {
    console.error('Error during quantity verification input process :', error);
    throw error;
  }
};
