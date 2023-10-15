import User from '../models/user.model';
import { IUser } from '../../types/user.type';
import bcrypt from 'bcrypt';

export const Login = async (userInfos: IUser): Promise<IUser | null> => {
  try {
    const { email } = userInfos;

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

export const MissingInfos = async (userInfos: IUser): Promise<boolean> => {
  try {
    const { email, password } = userInfos;

    if (!email || !password) {
      return true;
    }
    return false;
  } catch (error: unknown) {
    console.error('Error checking missing infos:', error);
    throw error;
  }
};

export const VerifyUserExists = async (userInfos: IUser): Promise<boolean> => {
  try {
    const { email } = userInfos;
    const ExistingUser = await User.findOne({ email });
    if (!ExistingUser) {
      return true;
    }
    return false;
  } catch (error: unknown) {
    console.error('Error checking missing infos:', error);
    throw error;
  }
};

export const passwordVerification = async (userInfos: IUser, loggedUser: IUser) => {
  try {
    const { password } = userInfos;
    const verifiedPassword = await bcrypt.compareSync(password, loggedUser.password);
    if (!verifiedPassword) {
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error during credentials verification infos:', error);
    throw error;
  }
};

const userLoginService = {
  Login,
  MissingInfos,
  VerifyUserExists,
  passwordVerification,
};

export default userLoginService;
