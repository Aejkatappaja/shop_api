import { encryptPassword } from '../../utils/encrypt-password';
import user_register_services from '../../database/services/user/register';
import { IUser } from '../../types/user.type';
import { Request, Response } from 'express';

export const userRegister = async (req: Request, res: Response): Promise<Response<IUser, Record<string, unknown>>> => {
  try {
    const userInfos: IUser = req.body;
    const { email } = userInfos;

    const missingRequiredInformations = await user_register_services.missingRequiredInformations(userInfos);

    if (missingRequiredInformations) {
      return res.status(400).json({ message: 'You need to provide all required informations' });
    }

    const emailAvailable = await user_register_services.emailAvailable(email);
    if (!emailAvailable) {
      return res.status(409).json({ message: 'There is a problem with provided credentials' });
    } else {
      const correctPasswordFormat = await user_register_services.passwordFormatVerification(userInfos.password);
      const passwordEncrypt = await encryptPassword(userInfos.password);
      if (correctPasswordFormat) {
        userInfos.password = passwordEncrypt;
      }

      await user_register_services.newUserCreation(userInfos);
      return res.status(200).json({ message: 'Account successfully created!' });
    }
  } catch (error: unknown) {
    return res.status(500).send({ message: 'Internal server error' });
  }
};
