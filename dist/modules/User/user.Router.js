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
exports.userRouter = void 0;
/* eslint-disable max-len */
const express_1 = require("express");
const jwt_1 = require("../../authentication/jwt");
const controller = __importStar(require("./userController"));
const router = (0, express_1.Router)();
const BASE_ROUTE = '/user';
/**
 * Read user.
 *
 * @openapi
 *
 * paths:
 *   /user/{id}:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Users
 *       summary: Read user
 *       description: Reads one user by Id.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: User Id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: User read successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/User"
 *         401:
 *           $ref: "#/components/responses/401"
 *         404:
 *           $ref: "#/components/responses/404"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.route(`${BASE_ROUTE}/:id`).get((0, jwt_1.authenticated)(), controller.getUser);
/**
 * Update user.
 *
 * @openapi
 *
 * paths:
 *   /user/{id}:
 *     patch:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Users
 *       summary: Update user
 *       description: Updates an existing user.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: User Id
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 genres:
 *                   type: array
 *                   minItems: 1
 *                   items:
 *                     type: string
 *       responses:
 *         204:
 *           description: User updated successfully.
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         403:
 *           $ref: "#/components/responses/403"
 *         404:
 *           $ref: "#/components/responses/404"
 *         422:
 *           description: Unprocessable Entity
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Error"
 *               examples:
 *                 userExists:
 *                   value:
 *                     code: ckgjkxvgl000431pp4xlpew2g
 *                     name: Unprocessable Entity
eslint-disable-next-line max-len
 *                     message: Your request was understood but could not be completed due to semantic errors
 *                     details: An user with the same name already exists
 *                   summary: User exists
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.route(`${BASE_ROUTE}/:id`).patch((0, jwt_1.authenticated)(), controller.updateUser);
/**
 * Read authors.
 *
 * @openapi
 *
 * paths:
 *   /userList:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       tags:
 *         - Authors
 *       summary: Read users
 *       description: Reads users. Supports search by genre and projected responses.
 *       parameters:
 *         - name: genre
 *           in: query
 *           description: Genre
 *           required: false
 *           schema:
 *             type: string
 *           example: "dystopian_fiction"
 *         - name: fields
 *           in: query
 *           description: Projected fields
 *           required: false
 *           schema:
 *             type: string
 *           example: "firstName,lastName,genres"
 *       responses:
 *         200:
 *           description: Users read successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: "#/components/schemas/User"
 *         400:
 *           $ref: "#/components/responses/400"
 *         401:
 *           $ref: "#/components/responses/401"
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.route(`${BASE_ROUTE}/userList`).get((0, jwt_1.authenticated)(), controller.getUserList);
// eslint-disable-next-line import/prefer-default-export
exports.userRouter = router;
