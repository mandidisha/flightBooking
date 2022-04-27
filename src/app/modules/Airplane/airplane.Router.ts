/* eslint-disable import/prefer-default-export */
import { Router } from 'express';
import { authenticated } from '../../authentication/jwt';
import * as controller from './airplaneController';

const router = Router();
const BASE_ROUTE = '/airplane';

/**
 * Create airplane.
 *
 * @openapi
 *
 * paths:
 *   /airplane:
 *     post:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Airport
 *       summary: Create airplane (Admin only)
 *       description: Adds a new airplane.
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - airplaneNumber
 *                 - airplaneModel
 *                 - numberOfSeats
 *               properties:
 *                 airportName:
 *                   type: number
 *                 country:
 *                   type: string
 *                 city:
 *                   type: number
 *       responses:
 *         201:
 *           description: Airplane created successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/airplane"
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
  controller.createAirplane,
);

/**
 * Update airplane.
 *
 * @openapi
 *
 * paths:
 *   /airplane/{id}:
 *     patch:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Airplane
 *       summary: Update airplane
 *       description: Updates an existing airplane.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: Airplane Id
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - airplaneNumber
 *                 - airplaneModel
 *                 - numberOfSeats
 *               properties:
 *                 airportName:
 *                   type: number
 *                 country:
 *                   type: string
 *                 city:
 *                   type: number
 *       responses:
 *         204:
 *           description: Airplane updated successfully.
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
  controller.updateAirplane,
);

/**
 * Read airplane.
 *
 * @openapi
 *
 * paths:
 *   /airplane:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Airplane
 *       summary: Read airplane
 *           parameters:
 *         - name: id
 *           in: path
 *           description: Airplane Id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Airplane read successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: "#/components/schemas/Airplane"
 *         400
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         500:
 *           $ref: "#/components/responses/500"
 */

router.route(`${BASE_ROUTE}/:id`).get(
  authenticated(),
  controller.getAirplane,
);

/**
 * Read airplanes.
 *
 * @openapi
 *
 * paths:
 *   /airplanes:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Airplane
 *       summary: Read airplanes
 *       description: Reads airplanes.
 *      parameters:
 *         - name: id
 *           in: path
 *           description: Airplane Id
 *           required: true
 *           schema:
 *             type: string
 *           schema:
 *             type: string
 *           example: "airplaneNumber,airplaneModel,numberOfSeats"
 *       responses:
 *         200:
 *           description: Airplanes read successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: "#/components/schemas/Airplane"
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         500:
 *           $ref: "#/components/responses/500"
 */

router.route(`${BASE_ROUTE}/airplanes`).get(
  authenticated(),
  controller.getAirplanes,
);

/**
 * Delete airplane.
 *
 * @openapi
 *
 * paths:
 *   /airplane/{id}:
 *     delete:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Airplane
 *       summary: Delete airplane (Admin only)
 *       description: Deletes an existing airplane.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: Airplane Id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         204:
 *           description: Airplane deleted successfully.
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
  controller.removeAirplane,
);

export const airplaneRouter = router;
