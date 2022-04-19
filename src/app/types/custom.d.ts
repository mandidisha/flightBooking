/* eslint-disable */

import DecodedToken from '../models/DecodedToken';

declare module 'express-serve-static-core' {
  interface Request {
    user: DecodedToken,
  }
}
