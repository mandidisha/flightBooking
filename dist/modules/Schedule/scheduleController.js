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
exports.getSchedule = exports.getSchedules = exports.removeSchedule = exports.updateAirport = exports.createAirport = void 0;
const Schedule_1 = __importDefault(require("../../models/Schedule"));
const authorization = __importStar(require("../../providers/mail/userAuthorization"));
const createAirport = async (req, res, next) => {
    const schedule = await Schedule_1.default.create({
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
    }
    catch (e) {
        next(e);
    }
};
exports.createAirport = createAirport;
const updateAirport = async (req, res) => {
    const schedule = await Schedule_1.default.findById(req.body._id);
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
    }
    else {
        res.sendStatus(404);
    }
};
exports.updateAirport = updateAirport;
const removeSchedule = async (req, res, next) => {
    await Schedule_1.default.findByIdAndRemove(req.body._id);
    authorization.authorizeWriteRequest({ schedule: req.user });
    try {
        res.sendStatus(204);
    }
    catch (e) {
        next(e);
    }
};
exports.removeSchedule = removeSchedule;
const getSchedules = async (req, res, next) => {
    const schedules = await Schedule_1.default.find({});
    try {
        res.send(schedules);
    }
    catch (e) {
        next(e);
    }
};
exports.getSchedules = getSchedules;
const getSchedule = async (req, res, next) => {
    const schedule = await Schedule_1.default.findById(req.body._id);
    try {
        res.send(schedule);
    }
    catch (e) {
        next(e);
    }
};
exports.getSchedule = getSchedule;
