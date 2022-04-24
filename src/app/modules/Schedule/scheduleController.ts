/* eslint-disable import/prefer-default-export */
import * as express from 'express';
import Schedule, { ISchedule } from '../../models/Schedule';
import * as authorization from '../../providers/mail/userAuthorization';

export const createAirport = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const schedule: ISchedule = await Schedule.create({
    scheduleNr: req.body.scheduleNr,
    departureTime: req.body.departureTime,
    arrivalTime: req.body.arrivalTime,
    ticketPrice: req.body.ticketPrice,
    startingAirport: req.body.startingAirport,
    landingAirport: req.body.landingAirport,
  });
  authorization.authorizeWriteRequest({ schedule: req.user });
  try {
    res.send(schedule);
  } catch (e) {
    next(e);
  }
};

export const updateAirport = async (
  req: express.Request,
  res: express.Response,
) => {
  const schedule = await Schedule.findById(req.body._id);
  authorization.authorizeWriteRequest({ schedule: req.user });
  if (schedule) {
    schedule.scheduleNr = req.body.scheduleNr;
    schedule.departureTime = req.body.departureTime;
    schedule.arrivalTime = req.body.arrivalTime;
    schedule.ticketPrice = req.body.ticketPrice;
    schedule.startingAirport = req.body.startingAirport;
    schedule.landingAirport = req.body.landingAirport;
    const updatedSchedule = await schedule.save();
    res.send(updatedSchedule);
  } else {
    res.sendStatus(404);
  }
};

export const removeSchedule = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  await Schedule.findByIdAndRemove(req.body._id);
  authorization.authorizeWriteRequest({ schedule: req.user });
  try {
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

export const getSchedules = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const schedules = await Schedule.find({});
  try {
    res.send(schedules);
  } catch (e) {
    next(e);
  }
};

export const getSchedule = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const schedule = await Schedule.findById(req.body._id);
  try {
    res.send(schedule);
  } catch (e) {
    next(e);
  }
};
