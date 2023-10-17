import { userExists } from './existing-user';
import { generateToken } from './generate-token';
import { passwordVerification } from './password-verification';
import { userSuccessfullyRetrieved } from './retrieve-user';
import { missingProvidedInformations } from './verifying-infos';

const user_login_services = {
  userExists,
  generateToken,
  missingProvidedInformations,
  userSuccessfullyRetrieved,
  passwordVerification,
};

export default user_login_services;
