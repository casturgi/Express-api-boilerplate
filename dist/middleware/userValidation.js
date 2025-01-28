"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const express_validator_1 = require("express-validator");
exports.validateUser = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Must be a valid email address').normalizeEmail(),
    (0, express_validator_1.body)('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];
//# sourceMappingURL=userValidation.js.map