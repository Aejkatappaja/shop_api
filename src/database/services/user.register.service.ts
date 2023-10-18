import User from '../models/user.model';
import { IUser } from '../../types/user.type';
import passwordRegex from '../../utils/password-regex';
import bcrypt from 'bcrypt';

export const Create = async (userInfos: IUser): Promise<IUser | null> => {
  try {
    const newUser = new User(userInfos);
    await newUser.save();
    return newUser;
  } catch (error: unknown) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const MissingInfos = async (userInfos: IUser): Promise<boolean> => {
  try {
    const { firstName, lastName, email, password } = userInfos;

    if (!firstName || !lastName || !email || !password) {
      return true;
    }
    return false;
  } catch (error: unknown) {
    console.error('Error checking missing infos:', error);
    throw error;
  }
};

export const EmailTaken = async (userInfos: IUser): Promise<boolean> => {
  try {
    const { email } = userInfos;

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

export const ValidPassword = async (userInfos: IUser): Promise<boolean> => {
  try {
    const { password } = userInfos;
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

export const EncryptPassword = async (userInfos: IUser): Promise<string> => {
  try {
    const { password } = userInfos;
    const passwordHash = bcrypt.hashSync(password, 10);
    return passwordHash;
  } catch (error: unknown) {
    console.error('Error hashing password:', error);
    throw error;
  }
};

const userRegisterService = {
  Create,
  MissingInfos,
  EmailTaken,
  ValidPassword,
  EncryptPassword,
};

export default userRegisterService;
