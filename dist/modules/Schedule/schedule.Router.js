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
const controller = __importStar(require("./scheduleController"));
const router = (0, express_1.Router)();
const BASE_ROUTE = '/schedule';
/**
 * Create airport.
 *
 * @openapi
 *
 * paths:
 *   /schedule:
 *     post:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Schedule
 *       summary: Create schedule (Admin only)
 *       description: Adds a new schedule.
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - scheduleNr
 *                 - departureTime
 *                 - arrivalTime
 *                 - ticketPrice
 *                 - startingAirport
 *                 - landingAirport
 *               properties:
 *                 scheduleNr:
 *                   type: number
 *                 departureTime:
 *                   type: date
 *                 arrivalTime:
 *                   type: date
 *                 ticketPrice:
 *                   type: number
 *                 startingAirport:
 *                   type: string
 *                 landingAirport:
 *                   type: string
 *       responses:
 *         201:
 *           description: Schedule created successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Schedule"
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.route(BASE_ROUTE).post((0, jwt_1.authenticated)(), controller.createAirport);
/**
 * Update schedule.
 *
 * @openapi
 *
 * paths:
 *   /schedule/{id}:
 *     patch:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Schedule
 *       summary: Update schedule
 *       description: Updates an existing schedule.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: Schedule Id
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *        required:
 *                 - scheduleNr
 *                 - departureTime
 *                 - arrivalTime
 *                 - ticketPrice
 *                 - startingAirport
 *                 - landingAirport
 *               properties:
 *                 scheduleNr:
 *                   type: number
 *                 departureTime:
 *                   type: date
 *                 arrivalTime:
 *                   type: date
 *                 ticketPrice:
 *                   type: number
 *                 startingAirport:
 *                   type: string
 *                 landingAirport:
 *                   type: string
 *       responses:
 *         204:
 *           description: Schedule updated successfully.
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         404:
 *           $ref: "#/components/responses/404"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.route(`${BASE_ROUTE}/:id`).patch((0, jwt_1.authenticated)(), controller.updateAirport);
/**
 * Delete Schedule.
 *
 * @openapi
 *
 * paths:
 *   /schedule/{id}:
 *     delete:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Schedule
 *       summary: Delete schedule (Admin only)
 *       description: Deletes an existing schedule.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: Schedule Id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         204:
 *           description: Schedule deleted successfully.
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         404:
 *           $ref: "#/components/responses/404"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.route(`${BASE_ROUTE}/:id`).delete((0, jwt_1.authenticated)(), controller.removeSchedule);
/**
 * Read schedules.
 *
 * @openapi
 *
 * paths:
 *   /schedules:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Schedule
 *       summary: Read schedules
 *       description: Reads schedules.
 *      parameters:
 *         - name: id
 *           in: path
 *           description: Schedule Id
 *           required: true
 *           schema:
 *             type: string
 *           schema:
 *             type: string
 *           example: "scheduleNr,departureTime,ArrivalTime"
 *       responses:
 *         200:
 *           description: schedules read successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: "#/components/schemas/Schedule"
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.route(`${BASE_ROUTE}/airports`).get((0, jwt_1.authenticated)(), controller.getSchedules);
/**
 * Read schedule.
 *
 * @openapi
 *
 * paths:
 *   /schedule:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Schedule
 *       summary: Read Schedule
 *       description: Reads schedule.
 *           parameters:
 *         - name: id
 *           in: path
 *           description: Schedule Id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Schedule read successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: "#/components/schemas/Schedule"
 *         400
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.route(`${BASE_ROUTE}/:id`).get((0, jwt_1.authenticated)(), controller.getSchedule);
