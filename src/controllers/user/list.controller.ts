import { Request, Response } from 'express';
import { IUser } from '../../types/user.type';
import user_get_services from '../../database/services/user/get';

export const getAllUsers = async (req: Request, res: Response): Promise<Response<IUser, Record<string, unknown>>> => {
  const { page } = req.query;
  let query = req.query.query as string;
  const currentPage = Number(page);
  try {
    if (Array.isArray(query)) {
      query = query[0];
    }

    const userList = await user_get_services.getUsersList(currentPage, query);
    if (userList) {
      return res.status(201).json(userList);
    } else return res.status(400).json({ message: 'Error during fetch user list process!' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
