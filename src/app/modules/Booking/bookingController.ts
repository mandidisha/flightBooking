/* eslint-disable no-shadow */
/* eslint-disable import/prefer-default-export */
import * as express from 'express';
import Booking, { IBooking } from '../../models/Booking';
import * as authorization from '../../providers/mail/userAuthorization';

export const createBooking = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const existingUser = await Booking.findOne({ userId: req.body.userId });
  if (existingUser) {
    throw new Error('user exsist');
  }
  const existingSeatNr = await Booking.findOne({ seatNr: req.body.seatNr });
  if (existingSeatNr) {
    throw new Error('SeatNr exsist');
  }
  const existingSchedule = await Booking.findOne({ scheduleId: req.body.scheduleId });
  if (existingSchedule) {
    throw new Error('Schedule exsist');
  }
  const booking: IBooking = await Booking.create({
    seatNr: req.body.seatNr,
    userId: req.body.userId,
    scheduleId: req.body.scheduleId,
  });
  authorization.authorizeWriteRequest(req.user);
  try {
    res.send(booking);
  } catch (e) {
    next(e);
  }
};

export const getBookings = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const bookings = await Booking.find({});
  authorization.authorizeWriteRequest(req.user);
  if (!bookings) {
    throw new Error('bookings not found');
  }
  try {
    res.send(bookings);
  } catch (e) {
    next(e);
  }
};

export const getBooking = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const booking = await Booking.findById(req.body._id);
  if (!booking) {
    throw new Error('airport not found');
  }
  try {
    res.send(booking);
  } catch (e) {
    next(e);
  }
};
export const removeBooking = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  await Booking.findByIdAndRemove(req.params.id);
  try {
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};
