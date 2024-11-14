"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupValidator = exports.validate = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(express_1.Request);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
exports.validate = validate;
exports.signupValidator = [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("email").trim().isEmail().notEmpty().withMessage("Email is required"),
    (0, express_validator_1.body)("password").trim().isLength({ min: 6 }).withMessage("Password should contain atleast 6 characters"),
];
//# sourceMappingURL=validators.js.map