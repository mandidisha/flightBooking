/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import Router from 'express';
import userRouter from '../modules/User/user.Router';
import { airplaneRouter } from '../modules/Airplane/airplane.Router';
import { airportRouter } from '../modules/Airport/airport.Router';
import authRouter from '../modules/auth/auth.Router';
import { bookingRouter } from '../modules/Booking/booking.Router';
import { scheduleRouter } from '../modules/Schedule/schedule.Router';

const router = Router();

// router.use(userRouter);
// router.use(airplaneRouter);
// router.use(airportRouter);
router.use(authRouter);
// router.use(bookingRouter);
// router.use(scheduleRouter);

export default router;
