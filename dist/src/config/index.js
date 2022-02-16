"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const isProd = process.env.MODE === 'prod';
const dbDetails = {
    host: process.env.HOST,
    user: process.env.USER_NAME,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DATABASE_PORT
};
const ormconfig = {
    type: 'postgres',
    host: dbDetails.host,
    port: Number(dbDetails.port),
    username: dbDetails.user,
    password: dbDetails.password,
    database: dbDetails.database,
    synchronize: true,
    logging: false,
    entities: [isProd ? 'dist/entity/**/*.js' : 'src/entity/**/*.ts'],
    ssl: {
        rejectUnauthorized: false
    }
};
const config = {
    port: Number(process.env.PORT),
    dbDetails: dbDetails,
    jwt_secret: process.env.JWT_SECRET,
    database_url: process.env.DATABASE_URL,
    ormconfig: ormconfig
};
exports.default = config;
//# sourceMappingURL=index.js.map