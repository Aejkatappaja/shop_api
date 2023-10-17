import userLoginService from '../../database/services/user.login.service';

import { IUserLogin } from '../../types/user.type';
import { Request, Response } from 'express';

export const userLogin = async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const userInfos: IUserLogin = req.body;

    const requiredInformationsMissing = await userLoginService.MissingProvidedInformations(userInfos);
    if (requiredInformationsMissing) {
      return res.status(400).json({ message: 'You need to provide all required informations' });
    }

    const verifyUserExists = await userLoginService.UserExists(userInfos.email);
    if (!verifyUserExists) {
      return res.status(400).json({ message: 'There is a problem with provided informations' });
    }

    const userLogged = await userLoginService.UserSuccessfullyRetrieved(userInfos);
    if (!userLogged) {
      return res.status(400).json({ message: 'There is a problem with your account informations' });
    }

    const verifiedPassword = await userLoginService.PasswordVerification(userInfos.password, userLogged.password);
    if (verifiedPassword) {
      const createToken = await userLoginService.GenerateToken(userLogged._id);
      if (createToken) {
        return res.status(200).json({ token: createToken });
      }
    } else {
      return res.status(409).json({ message: 'You provided wrong informations' });
    }
  } catch (error: unknown) {
    return res.status(500).send({ message: 'Internal server error' });
  }
};
