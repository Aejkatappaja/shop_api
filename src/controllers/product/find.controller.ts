import { IProduct } from '../../types/product.type';
import { Request, Response } from 'express';
import { product_get_by_id_services } from '../../database/services/product';

export const getProductById = async (
  req: Request,
  res: Response,
): Promise<Response<IProduct, Record<string, unknown>>> => {
  const productId = req.params.id;
  try {
    const product: IProduct = await product_get_by_id_services.getProductById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    } else {
      return res.status(200).send({ product });
    }
  } catch (error: unknown) {
    return res.status(500).send({ message: 'Internal server error' });
  }
};
