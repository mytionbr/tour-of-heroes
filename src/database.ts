import "reflect-metadata";
import {Connection, createConnection, getConnection} from "typeorm";
import config from "./config";

export const connect = async (): Promise<void> => {
    const { ormconfig } = config
    await createConnection(ormconfig);
    console.log('Connected database');  
}

export const close = async (): Promise<void> => {
    const connection: Connection = getConnection();
    await connection.close()
}