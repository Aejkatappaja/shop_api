import { Request, Response, NextFunction } from 'express';

export const isAdmin = (req: Request & { user?: { role: string } }, res: Response, next: NextFunction): void => {
  //   if (req.body.user && req.body.user.role === 'Admin') {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. You are not an admin.' });
  }
};
