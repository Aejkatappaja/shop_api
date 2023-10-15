import userLoginService from '../../database/services/user.login.service';

import { IUser, IUserResponse } from '../../types/user.type';
import { Request, Response } from 'express';

export const userLogin = async (req: Request, res: Response): Promise<Response<IUser, Record<string, unknown>>> => {
  try {
    const userInfos: IUser = req.body;

    const missingUserInfos = await userLoginService.MissingInfos(userInfos);

    const verifyUserExists = await userLoginService.VerifyUserExists(userInfos);

    const userLogged = await userLoginService.Login(userInfos);

    const verifiedPassword = await userLoginService.passwordVerification(userInfos, userLogged);

    if (missingUserInfos) {
      return res.status(400).json({ message: 'You need to provide all required informations' });
    }

    if (verifyUserExists) {
      return res.status(400).json({ message: 'There is a problem with provided informations' });
    }

    if (!userLogged) {
      return res.status(400).json({ message: 'There is a problem with your account informations' });
    }

    if (verifiedPassword) {
      const { firstName, lastName, email, address, avatar, role } = userLogged;
      const userResponse: IUserResponse = {
        firstName,
        lastName,
        role,
        address,
        email,
        avatar,
      };
      return res.status(200).json(userResponse);
    } else {
      return res.status(409).json({ message: 'You provided wrong informations' });
    }
  } catch (error: unknown) {
    return res.status(500).send({ message: 'Internal server error' });
  }
};
