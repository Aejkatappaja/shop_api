import { IProduct } from '../../types/product.type';
import { Request, Response } from 'express';
import { product_get_by_id_services } from '../../database/services/product';

export const updateProduct = async (
  req: Request,
  res: Response,
): Promise<Response<IProduct, Record<string, unknown>>> => {
  try {
    const { body } = req;
    const { id } = req.params;
    const { name } = body;

    console.log(req.body);

    if (!id) {
      return res.status(400).json({ message: 'You need to provide an Id!' });
    }

    const product: IProduct = await product_get_by_id_services.getProductById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name ?? product.name;

    await product.save();
    return res.status(201).send(product);
  } catch (error: unknown) {
    return res.status(500).send({ message: 'Internal server error' });
  }
};
