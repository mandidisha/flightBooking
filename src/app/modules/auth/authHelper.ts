import Path from 'path';
import Ejs from 'ejs';
import InlineCss from 'inline-css';
import { sendEmail } from '../mail/sendgrid';
import { getRedirectUrl } from '../helpers/urlUtils';
// eslint-disable-next-line import/prefer-default-export
export const sendConfirmationEmail = async ({ user, redirectUrl }:any) => {
  const confirmationURL = getRedirectUrl(redirectUrl, `token=${user.confirmationToken}`);
  const name = user.firstName;
  const emailContent = await Ejs.renderFile(
    Path.resolve(__dirname, '../templatesMail/accountConfirmation'),
    {
      user: name || '',
      confirmationLink: confirmationURL,
    },
  );
  const html = await InlineCss(emailContent, {
    url: ' ',
    applyStyleTags: true,
  });
  await sendEmail({
    to: user.email,
    subject: 'Account Confirmation',
    html,
  });
};

export const sendEmailWithResetPasswordLink = async ({ user, redirectUrl }:any) => {
  const emailContent = await Ejs.renderFile(
    Path.resolve(__dirname, '../../../templates/mail/reset_password_instructions.ejs'),
    {
      user: user.firstName,
      resetPasswordUrl: getRedirectUrl(redirectUrl, `token=${user.confirmationToken}`),
    },
  );
  const html = await InlineCss(emailContent, {
    url: ' ',
    applyStyleTags: true,
  });

  await sendEmail({
    to: user.email,
    subject: 'Reset Password Instructions',
    html,
  });
};
