import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const isAdmin = (req: Request & { user?: { role: string } }, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return;
    }

    const accessToken = token.split(' ')[1];
    console.log(accessToken);

    jwt.verify(accessToken, 'secret', (err, decoded: JwtPayload | string) => {
      if (err) {
        return res.status(401).json({ message: 'Token is invalid' });
      }

      if (typeof decoded === 'string') {
        return;
      } else {
        const userRole = (decoded as JwtPayload).role;

        if (userRole !== 'Admin') {
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
