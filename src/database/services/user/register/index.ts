import { passwordFormatVerification } from './password-format-verification';
import { missingRequiredInformations } from './provided-credentials-verification';
import { newUserCreation } from './user-creation';
import { emailAvailable } from './email-available-verification';

const user_register_services = {
  missingRequiredInformations,
  emailAvailable,
  passwordFormatVerification,
  newUserCreation,
};

export default user_register_services;
