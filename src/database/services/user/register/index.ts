import { passwordFormatVerification } from './verification-password-format';
import { missingRequiredInformations } from './verification-credentials';
import { newUserCreation } from './creation-user';
import { emailAvailable } from './verification-email-availaibility';

const user_register_services = {
  missingRequiredInformations,
  emailAvailable,
  passwordFormatVerification,
  newUserCreation,
};

export default user_register_services;
