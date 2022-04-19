import Sendgrid from '@sendgrid/mail';

import config from '../development';

Sendgrid.setApiKey(config.mailServiceApiKey as string);

/**
 * Creates and sends an email.
 *
 * @param from
 * @param to
 * @param subject
 * @param html: Email content formatted as HTML
 * @param attachments: Attachments
 */

// eslint-disable-next-line import/prefer-default-export
export const sendEmail = ({ params }:any) => new Promise((resolve, reject) => {
  const body = {
    ...params,
    from: {
      email: params.from || config.mailServiceSender,
      name: config.appName,
    },
  };

  if (params.attachments) {
    body.attachments = params.attahments;
  }

  Sendgrid.send(body, false, (error: Error, info: {}) => {
    if (error) {
      reject(error);
    } else {
      resolve(info);
    }
  });
});
