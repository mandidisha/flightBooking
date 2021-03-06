/* eslint-disable import/prefer-default-export */
import * as express from 'express';
import Airport, { IAirport } from '../../models/Airport';
import * as authorization from '../../providers/mail/userAuthorization';

export const createAirport = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  authorization.authorizeWriteRequest(req.user);
  const existing = await Airport.findOne({ airportName: req.body.airportName });
  if (existing) {
    throw new Error('Airport exsist');
  }
  const airport: IAirport = await Airport.create({
    airportName: req.body.airportName,
    country: req.body.country,
    city: req.body.city,
  });
  try {
    res.send(airport);
  } catch (e) {
    next(e);
  }
};

export const updateAirport = async (
  req: express.Request,
  res: express.Response,
) => {
  const airport = await Airport.findById(req.params.id);
  authorization.authorizeWriteRequest(req.user);
  if (airport) {
    airport.airportName = req.body.airportName;
    airport.country = req.body.country;
    airport.city = req.body.city;
    const updatedAirport = await airport.save();
    res.send(updatedAirport);
  } else {
    res.sendStatus(404);
  }
};

export const removeAirport = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  await Airport.findByIdAndRemove(req.params.id);
  try {
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

export const getAirports = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const airports = await Airport.find({});
  if (!airports) {
    throw new Error('airports not found');
  }
  try {
    res.send(airports);
  } catch (e) {
    next(e);
  }
};

export const getAirport = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const airport = await Airport.findById(req.body._id);
  if (!airport) {
    throw new Error('airport not found');
  }
  try {
    res.send(airport);
  } catch (e) {
    next(e);
  }
};
