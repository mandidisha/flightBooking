import { Router } from 'express';
import * as controller from './authController';

const router = Router();
const BASE_ROUTE = 'localhost:8000/auth';

router.route(`${BASE_ROUTE}/register`).post(
  controller.registerUser,
);

router.route(`${BASE_ROUTE}/resend-confirmation-email`).post(
  controller.resendConfirmationEmail,
);

router.route(`${BASE_ROUTE}/confirmation`).put(
  controller.confirmAccount,
);

router.route(`${BASE_ROUTE}/login`).post(
  controller.logIn,
);

router.route(`${BASE_ROUTE}/request-new-password`).post(
  controller.requestNewPassword,
);

router.route(`${BASE_ROUTE}/password`).post(
  controller.resetPassword,
);
