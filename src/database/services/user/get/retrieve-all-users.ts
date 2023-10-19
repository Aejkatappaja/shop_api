import User from '../../../models/user.model';
import { IUser } from '../../../../types/user.type';

export const getUsersList = async (): Promise<IUser[] | null> => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    if (users) {
      return users;
    } else return null;
  } catch (error) {
    console.error('Error during fetching productId process :', error);
    throw error;
  }
};
