import { Request, Response } from 'express';
import Product from '../../database/models/product.model';

export const deleteProduct = async (
  req: Request,
  res: Response,
): Promise<Response<string, Record<string, unknown>>> => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ message: 'You need to provide an Id!' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(401).json({ message: 'Product not found!' });
    } else {
      await product.deleteOne();
      return res.status(200).json({ message: 'Product successfully deleted!' });
    }
  } catch (error: unknown) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
