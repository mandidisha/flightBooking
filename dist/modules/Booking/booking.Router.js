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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_1 = require("../../authentication/jwt");
const controller = __importStar(require("./bookingController"));
const router = (0, express_1.Router)();
const BASE_ROUTE = '/booking';
/**
 * Create booking.
 *
 * @openapi
 *
 * paths:
 *   /booking:
 *     post:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Booking
 *       summary: Create booking (Admin only)
 *       description: Adds a new booking.
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - seatNr
 *                 - user
 *                 - schedule
 *               properties:
 *                 seatNr:
 *                   type: number
 *                 user:
 *                   type: string
 *                 schedule:
 *                   type: string

 *       responses:
 *         201:
 *           description: Booking created successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/booking"
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.route(BASE_ROUTE).post((0, jwt_1.authenticated)(), controller.createBooking);
/**
 * Read bookings.
 *
 * @openapi
 *
 * paths:
 *   /bookings:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Booking
 *       summary: Read bookings
 *       description: Reads bookings.
 *      parameters:
 *         - name: id
 *           in: path
 *           description: Booking Id
 *           required: true
 *           schema:
 *             type: string
 *           schema:
 *             type: string
 *           example: "seatNr,user,schedule"
 *       responses:
 *         200:
 *           description: bookings read successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: "#/components/schemas/Booking"
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.route(`${BASE_ROUTE}/bookings`).get((0, jwt_1.authenticated)(), controller.getBookings);
/**
 * Read airport.
 *
 * @openapi
 *
 * paths:
 *   /booking:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Airport
 *       summary: Read Booking
 *       description: Reads booking.
 *           parameters:
 *         - name: id
 *           in: path
 *           description: Booking Id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Booking read successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: "#/components/schemas/Booking"
 *         400
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.route(`${BASE_ROUTE}/:id`).get((0, jwt_1.authenticated)(), controller.getBooking);
