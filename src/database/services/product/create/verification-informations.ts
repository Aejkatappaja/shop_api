import { IProduct } from '../../../../types/product.type';

export const missingRequiredInformation = async (productInfos: IProduct): Promise<IProduct | boolean> => {
  try {
    const { brand, name, price, quantity, description } = productInfos;

    if (!brand || !name || !price || !quantity || !description) {
      return true;
    }
    return false;
  } catch (error: unknown) {
    console.error('Error during product infos verification process :', error);
    throw error;
  }
};
