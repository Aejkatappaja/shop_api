import { IUserLogin } from '../../types/user.type';
import { Request, Response } from 'express';
import user_login_services from '../../database/services/user/login';
import { generateToken } from '../../utils/generate-token';

export const userLogin = async (req: Request, res: Response): Promise<Response<string>> => {
  try {
    const userInfos: IUserLogin = req.body;

    const missingRequiredInformations = await user_login_services.missingRequiredInformations(userInfos);
    if (missingRequiredInformations) {
      return res.status(400).json({ message: 'You need to provide all required informations' });
    }

    const userExists = await user_login_services.userExists(userInfos.email);
    if (!userExists) {
      return res.status(400).json({ message: 'There is a problem with provided informations' });
    }

    const userSuccessfullyRetrieved = await user_login_services.userSuccessfullyRetrieved(userInfos.email);
    if (!userSuccessfullyRetrieved) {
      return res.status(400).json({ message: 'There is a problem with your account informations' });
    }

    const passwordMatches = await user_login_services.passwordVerification(
      userInfos.password,
      userSuccessfullyRetrieved.password,
    );

    if (passwordMatches) {
      const createToken = await generateToken(userSuccessfullyRetrieved._id);
      if (!createToken) {
        return res.status(400).json({ message: 'There is a problem with token generation process' });
      } else return res.status(200).json({ token: createToken });
    } else {
      return res.status(409).json({ message: 'You provided wrong informations' });
    }
  } catch (error: unknown) {
    return res.status(500).send({ message: 'Internal server error' });
  }
};
