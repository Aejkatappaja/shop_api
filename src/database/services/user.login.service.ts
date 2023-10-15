import User from '../models/user.model';
import { IUser, IUserResponse } from '../../types/user.type';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../configs/env.config';

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

export const passwordVerification = async (userInfos: IUser, loggedUser: IUser): Promise<boolean> => {
  try {
    const { password } = userInfos;
    const verifiedPassword = bcrypt.compareSync(password, loggedUser.password);
    if (!verifiedPassword) {
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error during credentials verification infos:', error);
    throw error;
  }
};

export const generateToken = async (userInfos: IUser) => {
  try {
    const { SECRET } = config;
    // const { role } = userInfos;
    const token = jwt.sign({ user: userInfos }, SECRET, { expiresIn: '1d' });
    return token;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const userResponse = async (userLogged: IUser, token: string): Promise<IUserResponse | null> => {
  try {
    const { firstName, lastName, email, address, avatar, role } = userLogged;
    const userResponse: IUserResponse = {
      firstName,
      lastName,
      address,
      email,
      avatar,
      role,
      token,
    };
    return userResponse;
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
  generateToken,
  userResponse,
};

export default userLoginService;
