"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = exports.connect = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const config_1 = require("./config");
const connect = async () => {
    const { ormconfig } = config_1.default;
    await (0, typeorm_1.createConnection)(ormconfig);
    console.log('Connected database');
};
exports.connect = connect;
const close = async () => {
    const connection = (0, typeorm_1.getConnection)();
    await connection.close();
};
exports.close = close;
//# sourceMappingURL=database.js.map