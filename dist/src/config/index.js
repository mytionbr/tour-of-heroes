"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const isProd = process.env.MODE === 'prod';
const dbDetails = {
    databaseUrl: process.env.DATABASE_URL
};
const ormconfig = {
    type: 'postgres',
    synchronize: true,
    logging: false,
    url: dbDetails.databaseUrl,
    entities: [isProd ? 'dist/src/entity/**/*.js' : 'src/entity/**/*.ts'],
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