/* eslint-disable import/prefer-default-export */
import { Router } from 'express';
import { authenticated } from '../../authentication/jwt';
import * as controller from './airportController';

const router = Router();
const BASE_ROUTE = '/airport';

/**
 * Create airport.
 *
 * @openapi
 *
 * paths:
 *   /airport:
 *     post:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Airport
 *       summary: Create airport (Admin only)
 *       description: Adds a new airport.
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - airportName
 *                 - country
 *                 - city
 *               properties:
 *                 airportName:
 *                   type: string
 *                 country:
 *                   type: string
 *                 city:
 *                   type: string
 *       responses:
 *         201:
 *           description: Airport created successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Airport"
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
  controller.createAirport,
);

/**
 * Update airport.
 *
 * @openapi
 *
 * paths:
 *   /airport/{id}:
 *     patch:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Airport
 *       summary: Update airport
 *       description: Updates an existing airport.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: Airport Id
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - airportName
 *                 - country
 *                 - city
 *               properties:
 *                 airportName:
 *                   type: string
 *                 country:
 *                   type: string
 *                 city:
 *                   type: string
 *       responses:
 *         204:
 *           description: Airport updated successfully.
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
  controller.updateAirport,
);

/**
 * Delete airport.
 *
 * @openapi
 *
 * paths:
 *   /airport/{id}:
 *     delete:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Airport
 *       summary: Delete airport (Admin only)
 *       description: Deletes an existing airport.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: Airport Id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         204:
 *           description: Airport deleted successfully.
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
  controller.removeAirport,
);

/**
 * Read airports.
 *
 * @openapi
 *
 * paths:
 *   /airport:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Airport
 *       summary: Read airports
 *       description: Reads airports.
 *       responses:
 *         200:
 *           description: Airports read successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: "#/components/schemas/Airport"
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         500:
 *           $ref: "#/components/responses/500"
 */

router.route(`${BASE_ROUTE}`).get(
  authenticated(),
  controller.getAirports,
);

/**
 * Read airport.
 *
 * @openapi
 *
 * paths:
 *   /airport/{id}:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Airport
 *       summary: Read Airport
 *       description: Reads airport.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: Airport Id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Airport read successfully.
 *           content:
 *             application/json:
 *               schema:
 *                   $ref: "#/components/schemas/Airport"
 *         401:
 *           $ref: "#/components/responses/401"
 *         404:
 *           $ref: "#/components/responses/404"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.route(`${BASE_ROUTE}/:id`).get(
  authenticated(),
  controller.getAirport,
);

export const airportRouter = router;
