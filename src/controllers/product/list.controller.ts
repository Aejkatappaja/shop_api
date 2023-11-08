import { IProduct } from '../../types/product.type';
import { Request, Response } from 'express';
import { product_get_all_services } from '../../database/services/product';

export const getProducts = async (
  req: Request,
  res: Response,
): Promise<Response<IProduct[], Record<string, unknown>>> => {
  const { page } = req.query;
  let query = req.query.query as string;
  const currentPage = Number(page);

  try {
    if (Array.isArray(query)) {
      query = query[0];
    }
    const productList = await product_get_all_services.getAllProducts(currentPage, query);

    if (!productList || productList.products.length === 0) {
      return res.status(404).json({ message: 'No products found in DB' });
    } else {
      return res.status(200).send(productList);
    }
  } catch (error: unknown) {
    return res.status(500).send({ message: 'Internal server error' });
  }
};
