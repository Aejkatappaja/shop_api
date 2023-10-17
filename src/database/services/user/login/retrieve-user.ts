import User from '../../../../database/models/user.model';
import { IUserLogin, IUser } from '../../../../types/user.type';

export const userSuccessfullyRetrieved = async (emailProvided: IUserLogin): Promise<IUser | null> => {
  try {
    const { email } = emailProvided;

    const loggedUser = await User.findOne({ email });

    if (!loggedUser) {
      return null;
    }
    return loggedUser;
  } catch (error: unknown) {
    console.error('Error login user:', error);
    throw error;
  }
};
