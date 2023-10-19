import User from '../../../../database/models/user.model';
import { IUser } from '../../../../types/user.type';

export const userSuccessfullyRetrieved = async (email: string): Promise<IUser | null> => {
  try {
    const getUser = await User.findOne({ email });

    if (!getUser) {
      return null;
    }
    return getUser;
  } catch (error: unknown) {
    console.error('Error login user:', error);
    throw error;
  }
};
