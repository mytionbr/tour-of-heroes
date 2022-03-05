import * as jwt from 'jsonwebtoken';
import { User } from '../entity/User';
import config from '../config';

export const generateToken = (user: User) => {
    return jwt.sign(
        {
            id: user.id,
            username: user.username
        },
        config.jwt_secret,
        {
            expiresIn: '1d'
        }
    )
}