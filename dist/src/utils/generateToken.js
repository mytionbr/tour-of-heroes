"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jwt = require("jsonwebtoken");
const config_1 = require("../config");
const generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        username: user.username
    }, config_1.default.jwt_secret, {
        expiresIn: '1d'
    });
};
exports.generateToken = generateToken;
//# sourceMappingURL=generateToken.js.map