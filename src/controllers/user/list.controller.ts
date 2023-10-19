import { Request, Response } from 'express';
import { IUser } from '../../types/user.type';
import user_get_services from '../../database/services/user/get';

export const getAllUsers = async (
  req: Request & { userId?: string },
  res: Response,
): Promise<Response<IUser, Record<string, unknown>>> => {
  try {
    const userList = await user_get_services.getUsersList();
    if (userList) {
      return res.status(201).json(userList);
    } else return res.status(400).json({ message: 'Error during fetch user list process!' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
