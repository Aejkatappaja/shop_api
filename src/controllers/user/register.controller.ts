import { encryptPassword } from '../../utils/encrypt-password';
import userRegisterService from '../../database/services/user.register.service';
import { IUser } from '../../types/user.type';
import { Request, Response } from 'express';

export const userRegister = async (req: Request, res: Response): Promise<Response<IUser, Record<string, unknown>>> => {
  try {
    const userInfos: IUser = req.body;

    const missingUserInfos = await userRegisterService.MissingInfos(userInfos);

    if (missingUserInfos) {
      return res.status(400).json({ message: 'You need to provide all required informations' });
    }

    const emailTaken = await userRegisterService.EmailTaken(userInfos);
    if (emailTaken) {
      return res.status(409).json({ message: 'Email already used' });
    } else {
      const validPassword = await userRegisterService.ValidPassword(userInfos);
      const passwordEncrypt = await encryptPassword(userInfos.password);
      if (validPassword) {
        userInfos.password = passwordEncrypt;
      }

      await userRegisterService.Create(userInfos);
      return res.status(200).json({ message: 'Account successfully created!' });
    }
  } catch (error: unknown) {
    return res.status(500).send({ message: 'Internal server error' });
  }
};
