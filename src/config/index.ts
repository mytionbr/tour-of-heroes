import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';

dotenv.config();

const isProd = process.env.MODE === 'prod';

const dbDetails = {
  host: process.env.HOST,
  user: process.env.USER_NAME,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DATABASE_PORT
};

const ormconfig: ConnectionOptions = {
  type: 'postgres',
  host: dbDetails.host,
  port: Number(dbDetails.port),
  username: dbDetails.user,
  password: dbDetails.password,
  database: dbDetails.database,
  synchronize: true,
  logging: false,
  entities: [isProd ? 'dist/entity/**/*.js' : 'src/entity/**/*.ts']
};

const config = {
  port: Number(process.env.PORT),
  dbDetails: dbDetails,
  jwt_secret: process.env.JWT_SECRET,
  database_url: process.env.DATABASE_URL,
  ormconfig: ormconfig
};

export default config;
