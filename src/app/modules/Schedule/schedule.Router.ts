/* eslint-disable import/prefer-default-export */
import { Router } from 'express';
import { authenticated } from '../../authentication/jwt';
import * as controller from './scheduleController';

const router = Router();
const BASE_ROUTE = '/schedule';

/**
 * Create schedule.
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
router.route(BASE_ROUTE).post(
  authenticated(),
  controller.createSchedule,
);

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
router.route(`${BASE_ROUTE}/:id`).patch(
  authenticated(),
  controller.updateSchedule,
);

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
router.route(`${BASE_ROUTE}/:id`).delete(
  authenticated(),
  controller.removeSchedule,
);

/**
 * Read schedules.
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
 *       summary: Read schedules
 *       description: Reads schedules.
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

router.route(`${BASE_ROUTE}`).get(
  authenticated(),
  controller.getSchedules,
);

/**
 * Read schedule.
 *
 * @openapi
 *
 * paths:
 *   /schedule/{id}:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Schedule
 *       summary: Read Schedule
 *       description: Reads schedule by id.
 *       parameters:
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
 *                 $ref: "#/components/schemas/Schedule"
 *         401:
 *           $ref: "#/components/responses/401"
 *         404:
 *           $ref: "#/components/responses/404"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.route(`${BASE_ROUTE}/:id`).get(
  authenticated(),
  controller.getSchedule,
);

export const scheduleRouter = router;
