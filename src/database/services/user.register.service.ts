import User from '../models/user.model';
import { IUser } from '../../types/user.type';
import passwordRegex from '../../utils/password-regex';

export const newUserCreation = async (userInfos: IUser): Promise<IUser | null> => {
  try {
    const newUser = new User(userInfos);
    await newUser.save();
    return newUser;
  } catch (error: unknown) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const missingRequiredInformations = async (userInfos: IUser): Promise<boolean> => {
  try {
    const { firstName, lastName, email, password } = userInfos;

    if (!firstName || !lastName || !email || !password) {
      return true;
    }
    return false;
  } catch (error: unknown) {
    console.error('Error during required informations verification process:', error);
    throw error;
  }
};

export const emailAvailable = async (email: string): Promise<boolean> => {
  try {
    const emailTaken = await User.findOne({ email });
    if (emailTaken) {
      return true;
    }
    return false;
  } catch (error: unknown) {
    console.error('Error checking email taken:', error);
    throw error;
  }
};

export const passwordFormatVerification = async (password: string): Promise<boolean> => {
  try {
    const regex = passwordRegex();
    const isPasswordvalid = regex.test(password);

    if (isPasswordvalid) {
      return true;
    }
    return false;
  } catch (error: unknown) {
    console.error('Error :', error);
    throw error;
  }
};

const userRegisterService = {
  newUserCreation,
  missingRequiredInformations,
  emailAvailable,
  passwordFormatVerification,
};

export default userRegisterService;
