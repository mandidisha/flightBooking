import * as sendgridDriver from './sendgrid';
import config from '../providers/development';

// eslint-disable-next-line import/no-mutable-exports
let mailService = null;

switch (config.mailService) {
  case 'sendgrid':
    mailService = sendgridDriver;
    break;
  default:
    mailService = sendgridDriver;
    break;
}

export default mailService;
