/* eslint-disable */

import DecodedToken from '../app/models/DecodedToken';

declare module 'express-serve-static-core' {
  interface Request {
    user: DecodedToken,
  }
}
