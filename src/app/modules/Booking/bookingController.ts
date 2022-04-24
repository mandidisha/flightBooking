/* eslint-disable import/prefer-default-export */
import * as express from 'express';
import Booking, { IBooking } from '../../models/Booking';
import * as authorization from '../../providers/mail/userAuthorization';

export const createBooking = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const existing = await Booking.find({ user: req.body.airportName });
  if (existing) {
    throw new Error('booking exsist');
  }
  const booking: IBooking = await Booking.create({
    seatNr: req.body.seatNr,
    user: req.body.user,
    schedule: req.body.schedule,
  });
  authorization.authorizeWriteRequest({ booking: req.user });
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
  authorization.authorizeWriteRequest({ bookings: req.user });
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
