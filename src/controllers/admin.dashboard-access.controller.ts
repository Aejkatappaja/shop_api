import { Request, Response } from 'express';

export const getDashboardAccess = async (
  req: Request,
  res: Response,
): Promise<Response<unknown, Record<string, unknown>>> => {
  try {
    return res.status(200).json({ message: 'Authorized' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
