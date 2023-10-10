import userRegisterService from '../../services/user.register.service';
import { IUser } from '../../types/user.type';
import { Request, Response } from 'express';

export const userRegister = async (req: Request, res: Response): Promise<Response<IUser, Record<string, unknown>>> => {
  try {
    const userInfos: IUser = req.body;

    const missingUserInfos = await userRegisterService.MissingInfos(userInfos);

    const emailTaken = await userRegisterService.EmailTaken(userInfos);

    const validPassword = await userRegisterService.ValidPassword(userInfos);

    const encryptPassword = await userRegisterService.EncryptPassword(userInfos);

    if (missingUserInfos) {
      return res.status(400).json({ message: 'You need to provide all required informations' });
    }
    if (emailTaken) {
      return res.status(409).json({ message: 'Email already used' });
    } else {
      if (validPassword) {
        userInfos.password = encryptPassword;
      }

      const newUser = await userRegisterService.Create(userInfos);
      return res.status(200).json({ newUser });
    }
  } catch (error: unknown) {
    return res.status(500).send({ message: 'Internal server error' });
  }
};
