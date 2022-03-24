"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const verifyToken_1 = require("../utils/verifyToken");
const authService_1 = require("../services/authService");
const authValidator_1 = require("../validators/authValidator");
const authService = new authService_1.AuthService();
class AuthController {
    async signup(req, res) {
        try {
            const userToSave = req.body;
            const { valid, errors } = await (0, authValidator_1.authValidator)(userToSave, authValidator_1.AuthValidationMode.SIGN_UP);
            if (!valid) {
                return res.status(400).send({ message: Object.values(errors) });
            }
            const savedUser = await authService.signup(userToSave);
            res.status(201).send(savedUser);
        }
        catch (error) {
            console.log(error);
            res.status(500).send('Algo deu errado');
        }
    }
    async singin(req, res) {
        try {
            const user = req.body;
            const { valid, errors } = await (0, authValidator_1.authValidator)(user, authValidator_1.AuthValidationMode.SIGN_IN);
            if (!valid) {
                return res.status(400).send({ message: Object.values(errors) });
            }
            const userResponse = await authService.signin(user);
            if (!userResponse) {
                return res.status(404).send({ message: 'email ou senha invalidos' });
            }
            res.status(200).send(userResponse);
        }
        catch (error) {
            console.log(error);
            res.status(500).send('Algo deu errado');
        }
    }
    isAuth(req, res, next) {
        const authorization = req.headers.authorization;
        if (authorization) {
            const token = authorization.slice(7, authorization.length);
            try {
                const decoded = (0, verifyToken_1.verifyToken)(token);
                req.auth = decoded;
                next();
            }
            catch (error) {
                return res.status(401).send({ message: error.message });
            }
        }
        else {
            return res.status(403).send({ message: 'Sem token' });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=authController.js.map