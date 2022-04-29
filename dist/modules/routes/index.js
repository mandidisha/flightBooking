"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRoutes = void 0;
/* eslint-disable import/prefer-default-export */
const userRouter_1 = require("./userRouter");
const apiRoutes = (app) => {
    app.use('api/user', userRouter_1.userRouter);
};
exports.apiRoutes = apiRoutes;
