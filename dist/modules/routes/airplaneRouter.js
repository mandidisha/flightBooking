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
const controller = __importStar(require("../Airplane/airplaneController"));
const router = (0, express_1.Router)();
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
router.route(BASE_ROUTE).post((0, jwt_1.authenticated)(), controller.createAirplane);
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
router.route(`${BASE_ROUTE}/:id`).patch((0, jwt_1.authenticated)(), controller.updateAirplane);
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
 *       description: Reads airplane. Supports search by genre and projected responses.
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
router.route(`${BASE_ROUTE}/:id`).get((0, jwt_1.authenticated)(), controller.getAirplane);
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
router.route(`${BASE_ROUTE}/airplanes`).get((0, jwt_1.authenticated)(), controller.getAirplanes);
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
router.route(`${BASE_ROUTE}/:id`).delete((0, jwt_1.authenticated)(), controller.removeAirplane);
