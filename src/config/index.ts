import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';

dotenv.config();

const isProd = process.env.MODE === 'prod';

const dbDetails = {
  host: process.env.HOST,
  user: process.env.USER_NAME,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DATABASE_PORT,
  databaseUrl: process.env.DATABASE_URL
};

const ormconfig: ConnectionOptions = {
  type: 'postgres',
  synchronize: true,
  logging: false,
  url: dbDetails.databaseUrl,
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

export default config;
