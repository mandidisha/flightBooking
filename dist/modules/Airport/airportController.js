"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAirport = exports.getAirports = exports.removeAirport = exports.updateAirport = exports.createAirport = void 0;
const Airport_1 = __importDefault(require("../../models/Airport"));
const authorization = __importStar(require("../../providers/mail/userAuthorization"));
const createAirport = async (req, res, next) => {
    const existing = await Airport_1.default.find({ airportName: req.body.airportName });
    if (existing) {
        throw new Error('Airport exsist');
    }
    const airport = await Airport_1.default.create({
        airportName: req.body.airportName,
        country: req.body.country,
        city: req.body.city,
    });
    authorization.authorizeWriteRequest({ airport: req.user });
    try {
        res.send(airport);
    }
    catch (e) {
        next(e);
    }
};
exports.createAirport = createAirport;
const updateAirport = async (req, res) => {
    const airport = await Airport_1.default.findById(req.body._id);
    authorization.authorizeWriteRequest({ airport: req.user });
    if (airport) {
        airport.airportName = req.body.airportName;
        airport.country = req.body.country;
        airport.city = req.body.city;
        const updatedAirport = await airport.save();
        res.send(updatedAirport);
    }
    else {
        res.sendStatus(404);
    }
};
exports.updateAirport = updateAirport;
const removeAirport = async (req, res, next) => {
    await Airport_1.default.findByIdAndRemove(req.body._id);
    try {
        res.sendStatus(204);
    }
    catch (e) {
        next(e);
    }
};
exports.removeAirport = removeAirport;
const getAirports = async (req, res, next) => {
    const airports = await Airport_1.default.find({});
    if (!airports) {
        throw new Error('airports not found');
    }
    try {
        res.send(airports);
    }
    catch (e) {
        next(e);
    }
};
exports.getAirports = getAirports;
const getAirport = async (req, res, next) => {
    const airport = await Airport_1.default.findById(req.body._id);
    if (!airport) {
        throw new Error('airport not found');
    }
    try {
        res.send(airport);
    }
    catch (e) {
        next(e);
    }
};
exports.getAirport = getAirport;
