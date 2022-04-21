/* eslint-disable max-len */
import { Router } from 'express';
import { authenticated } from '../../authentication/jwt';
import * as controller from './userController';

const router = Router();
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

router.route(`${BASE_ROUTE}/:id`).get(
  authenticated(),
  controller.getUser,
);

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
 *                     message: Your request was understood but could not be completed due to semantic errors
 *                     details: An user with the same name already exists
 *                   summary: User exists
 *         500:
 *           $ref: "#/components/responses/500"
 */

router.route(`${BASE_ROUTE}/:id`).patch(
  authenticated(),
  controller.updateUser,
);

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
router.route(`${BASE_ROUTE}/userList`).get(
  authenticated(),
  controller.getUserList,
);
