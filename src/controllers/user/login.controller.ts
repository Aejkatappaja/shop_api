import userLoginService from '../../database/services/user.login.service';

import { IUser } from '../../types/user.type';
import { Request, Response } from 'express';

export const userLogin = async (req: Request, res: Response): Promise<Response<IUser, Record<string, unknown>>> => {
  try {
    const userInfos: IUser = req.body;

    const missingUserInfos = await userLoginService.MissingInfos(userInfos);
    if (missingUserInfos) {
      return res.status(400).json({ message: 'You need to provide all required informations' });
    }

    const verifyUserExists = await userLoginService.VerifyUserExists(userInfos);
    if (verifyUserExists) {
      return res.status(400).json({ message: 'There is a problem with provided informations' });
    }

    const userLogged = await userLoginService.Login(userInfos);
    if (!userLogged) {
      return res.status(400).json({ message: 'There is a problem with your account informations' });
    }

    const verifiedPassword = await userLoginService.passwordVerification(userInfos, userLogged);
    if (verifiedPassword) {
      const createToken = await userLoginService.generateToken(userLogged);
      const userResponse = await userLoginService.userResponse(userLogged, createToken);
      return res.status(200).json(userResponse);
    } else {
      return res.status(409).json({ message: 'You provided wrong informations' });
    }
  } catch (error: unknown) {
    return res.status(500).send({ message: 'Internal server error' });
  }
};
