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
exports.removeAirplane = exports.getAirplanes = exports.getAirplane = exports.updateAirplane = exports.createAirplane = void 0;
const Airplanes_1 = __importDefault(require("../../models/Airplanes"));
const Airport_1 = __importDefault(require("../../models/Airport"));
const authorization = __importStar(require("../../providers/mail/userAuthorization"));
const createAirplane = async (req, res, next) => {
    const existing = await Airplanes_1.default.find({ airplaneNumber: req.body.airplaneNumber });
    if (existing) {
        throw new Error('Airplane exsist');
    }
    const airplane = await Airplanes_1.default.create({
        airplaneNumber: req.body.airplaneNumber,
        airplaneModel: req.body.airplaneModel,
        numberOfSeats: req.body.numberOfSeats,
    });
    authorization.authorizeWriteRequest({ airplane: req.user });
    try {
        res.send(airplane);
    }
    catch (e) {
        next(e);
    }
};
exports.createAirplane = createAirplane;
const updateAirplane = async (req, res) => {
    const airplane = await Airplanes_1.default.findById(req.body._id);
    authorization.authorizeWriteRequest({ airplane: req.user });
    if (airplane) {
        airplane.airplaneNumber = req.body.airplaneNumber;
        airplane.airplaneModel = req.body.airplaneModel;
        airplane.numberOfSeats = req.body.numberOfSeats;
        const updatedAirplane = await airplane.save();
        res.send(updatedAirplane);
    }
    else {
        res.sendStatus(404);
    }
};
exports.updateAirplane = updateAirplane;
const getAirplane = async (req, res, next) => {
    const airplane = await Airplanes_1.default.findById(req.body._id);
    if (!airplane) {
        throw new Error('not found');
    }
    try {
        res.send(airplane);
    }
    catch (e) {
        next(e);
    }
};
exports.getAirplane = getAirplane;
const getAirplanes = async (req, res, next) => {
    const airplanes = await Airport_1.default.find({});
    if (!airplanes) {
        throw new Error('Airplanes not found');
    }
    try {
        res.send(airplanes);
    }
    catch (e) {
        next(e);
    }
};
exports.getAirplanes = getAirplanes;
const removeAirplane = async (req, res, next) => {
    authorization.authorizeWriteRequest({ airplane: req.user });
    await Airplanes_1.default.findByIdAndRemove(req.body._id);
    try {
        res.sendStatus(204);
    }
    catch (e) {
        next(e);
    }
};
exports.removeAirplane = removeAirplane;
