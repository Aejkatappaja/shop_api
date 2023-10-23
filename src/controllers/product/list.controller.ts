import { IProduct } from '../../types/product.type';
import { Request, Response } from 'express';
import { product_get_all_services } from '../../database/services/product';

export const getProducts = async (
  req: Request,
  res: Response,
): Promise<Response<IProduct[], Record<string, unknown>>> => {
  try {
    const productList = await product_get_all_services.getAllProducts();

    if (!productList || productList.length === 0) {
      return res.status(404).json({ message: 'No products found in DB' });
    } else {
      return res.status(200).send(productList);
    }
  } catch (error: unknown) {
    return res.status(500).send({ message: 'Internal server error' });
  }
};
