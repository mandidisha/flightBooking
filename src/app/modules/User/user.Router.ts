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
 *         - User
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
 *         - User
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
 *               required:
 *                 - firstName
 *                 - lastName
 *                 - gender
 *               properties:
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 gender:
 *                   type: string
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
 *         500:
 *           $ref: "#/components/responses/500"
 */
router.route(`${BASE_ROUTE}/:id`).patch(
  authenticated(),
  controller.updateUser,
);

/**
 * Read users.
 *
 * @openapi
 *
 * paths:
 *   /user:
 *     get:
*       security:
 *         - bearerAuth: []
 *       tags:
 *         - User
 *       summary: Read users
 *       description: Reads users.
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

router.route(`${BASE_ROUTE}`).get(
  authenticated(),
  controller.getUserList,
);

// eslint-disable-next-line import/prefer-default-export
export default router;
