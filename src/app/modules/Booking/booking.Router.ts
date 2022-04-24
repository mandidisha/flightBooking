import { Router } from 'express';
import { authenticated } from '../../authentication/jwt';
import * as controller from './bookingController';

const router = Router();
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

router.route(BASE_ROUTE).post(
  authenticated(),
  controller.createBooking,
);

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

router.route(`${BASE_ROUTE}/bookings`).get(
  authenticated(),
  controller.getBookings,
);

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
router.route(`${BASE_ROUTE}/:id`).get(
  authenticated(),
  controller.getBooking,
);
