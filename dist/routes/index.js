"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const router = (0, express_1.Router)();
/**
 * Read all routers from the '/modules' directory.
 */
const modulesDirContent = (0, fs_1.readdirSync)(path_1.default.join(__dirname, '../modules'));
modulesDirContent.forEach((item) => {
    const currentItemPath = path_1.default.join(__dirname, `../modules/${item}`);
    const isDirectory = (0, fs_1.lstatSync)(currentItemPath).isDirectory();
    if (isDirectory) {
        const routerFilePath = path_1.default.join(__dirname, `../modules/${item}/${item}.Router.js`);
        const module = require(routerFilePath);
        if (module && module.default) {
            router.use(module.default);
        }
    }
});
exports.default = router;
