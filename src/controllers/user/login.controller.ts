import { IUserLogin } from '../../types/user.type';
import { Request, Response } from 'express';
import user_login_services from '../../database/services/user/login';
import { generateToken } from '../../utils/generate-token';

export const userLogin = async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const userInfos: IUserLogin = req.body;

    const requiredInformationsMissing = await user_login_services.missingProvidedInformations(userInfos);
    if (requiredInformationsMissing) {
      return res.status(400).json({ message: 'You need to provide all required informations' });
    }

    const verifyUserExists = await user_login_services.userExists(userInfos.email);
    if (!verifyUserExists) {
      return res.status(400).json({ message: 'There is a problem with provided informations' });
    }

    const userLogged = await user_login_services.userSuccessfullyRetrieved(userInfos);
    if (!userLogged) {
      return res.status(400).json({ message: 'There is a problem with your account informations' });
    }

    const passwordMatches = await user_login_services.passwordVerification(userInfos.password, userLogged.password);

    if (passwordMatches) {
      const createToken = await generateToken(userLogged._id);
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
