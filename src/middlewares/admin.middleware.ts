import config from '../configs/env.config';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUserResponse } from '../types/user.type';

export const isAdmin = (req: Request & { user?: IUserResponse }, res: Response, next: NextFunction): void => {
  try {
    const { SECRET } = config;
    const token = req.headers.authorization;
    if (!token) {
      return;
    }

    const accessToken = token.split(' ')[1];

    jwt.verify(accessToken, SECRET, (err, decoded: JwtPayload | string) => {
      if (err) {
        return res.status(401).json({ message: 'Token is invalid' });
      }

      if (typeof decoded === 'string') {
        return;
      } else {
        const user = (decoded as JwtPayload).user;

        if (user) {
          delete user.password;
          req.user = user;
        }

        if (user.role !== 'Admin') {
          return res.status(403).json({ message: 'Insufficient permissions' });
        }
      }

      next();
    });
  } catch (error: unknown) {
    console.error('error on credentials checking process', error);
    throw error;
  }
};
