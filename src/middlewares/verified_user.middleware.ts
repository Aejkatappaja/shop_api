import config from '../configs/env.config';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../database/models/user.model';

export const verifiedUser = (
  req: Request & { userId?: string },
  res: Response,
  next: NextFunction,
): void | Response => {
  try {
    const { SECRET } = config;
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token is missing' });
    }

    const accessToken = token.split(' ')[1];

    jwt.verify(accessToken, SECRET, async (err, decoded: JwtPayload | string): Promise<NextFunction | Response> => {
      if (err) {
        return res.status(401).json({ message: 'Token is invalid' });
      }

      if (typeof decoded === 'string') {
        return;
      } else {
        const user = await User.findById((decoded as JwtPayload).id);
        const isAdmin = user.role === 'Admin';

        if (!user) {
          return res.status(403).json({ message: 'Insufficient permissions' });
        }
        if (user._id !== req.userId && !isAdmin) {
          return res.status(403).json({ message: 'Access denied. You have not the right access.' });
        }

        req.userId = user._id;

        next();
      }
    });
  } catch (error: unknown) {
    console.error('error on credentials checking process', error);
    throw error;
  }
};
