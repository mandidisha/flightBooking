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
const controller = __importStar(require("./airportController"));
const router = (0, express_1.Router)();
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
router.route(BASE_ROUTE).post((0, jwt_1.authenticated)(), controller.createAirport);
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
 *               properties:
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
router.route(`${BASE_ROUTE}/:id`).patch((0, jwt_1.authenticated)(), controller.updateAirport);
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
router.route(`${BASE_ROUTE}/:id`).delete((0, jwt_1.authenticated)(), controller.removeAirport);
/**
 * Read airplanes.
 *
 * @openapi
 *
 * paths:
 *   /airports:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Airport
 *       summary: Read airports
 *       description: Reads airports.
 *      parameters:
 *         - name: id
 *           in: path
 *           description: Airport Id
 *           required: true
 *           schema:
 *             type: string
 *           schema:
 *             type: string
 *           example: "airportName,country,city"
 *       responses:
 *         200:
 *           description: airports read successfully.
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
router.route(`${BASE_ROUTE}/airports`).get((0, jwt_1.authenticated)(), controller.getAirports);
/**
 * Read airport.
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
 *       summary: Read Airport
 *       description: Reads airport.
 *           parameters:
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
 *                 type: array
 *                 items:
 *                   $ref: "#/components/schemas/Airport"
 *         400
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.route(`${BASE_ROUTE}/:id`).get((0, jwt_1.authenticated)(), controller.getAirport);
