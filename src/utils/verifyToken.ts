import * as jwt from 'jsonwebtoken'
import config from '../config/'

export  function verifyToken(token: string): string | jwt.JwtPayload {
    let result: string | jwt.JwtPayload = '' ; 
    jwt.verify(token, config.jwt_secret, (err, decoded)=>{
         if(err)
            throw new Error('Token invalido')
        
        result = decoded
     });

     return result;
}