/* eslint-disable import/prefer-default-export */
import * as express from 'express';
import Airplane, { IAirplane } from '../../models/Airplanes';
import Airport from '../../models/Airport';
import * as authorization from '../../providers/mail/userAuthorization';

export const createAirplane = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const existing = await Airplane.find({ airplaneNumber: req.body.airplaneNumber });
  if (existing) {
    throw new Error('Airplane exsist');
  }

  const airplane: IAirplane = await Airplane.create({
    airplaneNumber: req.body.airplaneNumber,
    airplaneModel: req.body.airplaneModel,
    numberOfSeats: req.body.numberOfSeats,
  });
  authorization.authorizeWriteRequest({ airplane: req.user });
  try {
    res.send(airplane);
  } catch (e) {
    next(e);
  }
};

export const updateAirplane = async (
  req: express.Request,
  res: express.Response,
) => {
  const airplane = await Airplane.findById(req.body._id);
  authorization.authorizeWriteRequest({ airplane: req.user });
  if (airplane) {
    airplane.airplaneNumber = req.body.airplaneNumber;
    airplane.airplaneModel = req.body.airplaneModel;
    airplane.numberOfSeats = req.body.numberOfSeats;
    const updatedAirplane = await airplane.save();
    res.send(updatedAirplane);
  } else {
    res.sendStatus(404);
  }
};

export const getAirplane = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const airplane = await Airplane.findById(req.body._id);
  if (!airplane) {
    throw new Error('not found');
  }
  try {
    res.send(airplane);
  } catch (e) {
    next(e);
  }
};

export const getAirplanes = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const airplanes = await Airport.find({});
  if (!airplanes) {
    throw new Error('Airplanes not found');
  }
  try {
    res.send(airplanes);
  } catch (e) {
    next(e);
  }
};

export const removeAirplane = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  authorization.authorizeWriteRequest({ airplane: req.user });
  await Airplane.findByIdAndRemove(req.body._id);
  try {
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};
