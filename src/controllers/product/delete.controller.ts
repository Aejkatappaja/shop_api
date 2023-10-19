import { Request, Response } from 'express';
import { product_get_by_id_services } from '../../database/services/product';
import product_delete_by_id_services from '../../database/services/product/delete';

export const deleteProduct = async (
  req: Request,
  res: Response,
): Promise<Response<string, Record<string, unknown>>> => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ message: 'You need to provide an Id!' });
    }

    const product = await product_get_by_id_services.getProductById(productId);
    if (!product) {
      return res.status(401).json({ message: 'Product not found!' });
    } else {
      const productDeleted = await product_delete_by_id_services.deleteProduct(productId);
      if (productDeleted) {
        return res.status(200).json({ message: 'Product successfully deleted!' });
      } else {
        return res.status(400).json({ message: 'Error during product deletion process!' });
      }
    }
  } catch (error: unknown) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};