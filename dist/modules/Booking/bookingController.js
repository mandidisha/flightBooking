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
exports.getBooking = exports.getBookings = exports.createBooking = void 0;
const Booking_1 = __importDefault(require("../../models/Booking"));
const authorization = __importStar(require("../../providers/mail/userAuthorization"));
const createBooking = async (req, res, next) => {
    const existing = await Booking_1.default.find({ user: req.body.airportName });
    if (existing) {
        throw new Error('booking exsist');
    }
    const booking = await Booking_1.default.create({
        seatNr: req.body.seatNr,
        user: req.body.user,
        schedule: req.body.schedule,
    });
    authorization.authorizeWriteRequest({ booking: req.user });
    try {
        res.send(booking);
    }
    catch (e) {
        next(e);
    }
};
exports.createBooking = createBooking;
const getBookings = async (req, res, next) => {
    const bookings = await Booking_1.default.find({});
    authorization.authorizeWriteRequest({ bookings: req.user });
    if (!bookings) {
        throw new Error('bookings not found');
    }
    try {
        res.send(bookings);
    }
    catch (e) {
        next(e);
    }
};
exports.getBookings = getBookings;
const getBooking = async (req, res, next) => {
    const booking = await Booking_1.default.findById(req.body._id);
    if (!booking) {
        throw new Error('airport not found');
    }
    try {
        res.send(booking);
    }
    catch (e) {
        next(e);
    }
};
exports.getBooking = getBooking;
