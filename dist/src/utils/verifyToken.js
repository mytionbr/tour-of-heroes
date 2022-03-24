"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jwt = require("jsonwebtoken");
const config_1 = require("../config/");
function verifyToken(token) {
    let result = '';
    jwt.verify(token, config_1.default.jwt_secret, (err, decoded) => {
        if (err)
            throw new Error('Token invalido');
        result = decoded;
    });
    return result;
}
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifyToken.js.map