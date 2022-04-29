/* eslint-disable new-cap */
/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */
import Sendgrid from '@sendgrid/mail';

import config from '../development';

Sendgrid.setApiKey(config.mailServiceApiKey);

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
// export const sendEmail = ({ params }: any) => new Promise((resolve, reject) => {
//   console.log('confin mail', params);

//   const body = {
//     ...params,
//     from: {
//       email: params.from || config.mailServiceSender,
//       name: config.appName,
//     },
//   };
//   if (params.attachments) {
//     body.attachments = params.attahments;
//   }

//   Sendgrid.send(body, false, (error: Error, info: {}) => {
//     if (error) {
//       reject(error);
//     } else {
//       resolve(info);
//     }
//   });
// });
export const sendEmail = (params: any) => {
  return Promise.resolve(params);
  //   console.log('params sendgrid', params);
  //   const body = {
  //     ...params,
  //     from: {
  //       email: params.from || config.mailServiceSender,
  //       name: config.appName,
  //     },
  //   };

  //   if (params.attachments) {
  //     body.attachments = params.attachments;
  //   }

  //   Sendgrid.send(body, false, (error: any, info: {}) => {
  //     console.log('bodYYYY', body);
  //     if (error) {
  //       reject(error);
  //       console.log('sendgrid error ', error.response.body.errors);
  //     } else {
  //       resolve(info);
  //     }
  //   });
  // });
};
