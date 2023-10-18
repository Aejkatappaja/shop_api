import { userExists } from './existing-user';
import { passwordVerification } from './password-verification';
import { userSuccessfullyRetrieved } from './retrieve-user';
import { missingProvidedInformations } from './verifying-infos';

const user_login_services = {
  userExists,
  missingProvidedInformations,
  userSuccessfullyRetrieved,
  passwordVerification,
};

export default user_login_services;
