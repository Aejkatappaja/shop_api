import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../configs/env.config';
import User from '../database/models/user.model';

const { SECRET } = config;

export const tokenGeneration = (id: string) => {
  try {
    if (!id) {
      return false;
    }
    const token = jwt.sign({ id }, SECRET, { expiresIn: '30d' });
    return token;
  } catch (error: unknown) {
    console.error('Error during token genration process:', error);
    throw error;
  }
};

export const verifyAdminToken = async (token: string) => {
  try {
    const accessToken = token.split(' ')[1];
    jwt.verify(accessToken, SECRET, async (err, decoded: JwtPayload | string) => {
      if (err) {
        return err;
      }

      if (typeof decoded === 'string') {
        return;
      } else {
        const id = (decoded as JwtPayload).id;

        if (id) {
          const user = await User.findById(id);
          delete user.password;
          return user;
        }
      }
    });
  } catch (error: unknown) {
    console.error('error on credentials checking process', error);
    throw error;
  }
};
