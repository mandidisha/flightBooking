"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneRegex = exports.passwordRegex = void 0;
exports.passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[?!@#$%^&*])[0-9a-zA-Z?!@#$%^&*]{6,}$/;
exports.phoneRegex = /^[0-9+]{10,}$/;
