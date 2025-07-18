import { NextFunction, Request, Response } from "express";
import { getUserData } from "../utils/jwt";

import { IRequestUser } from "../utils/interfaces";
import response from "../utils/response";

export default (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers?.authorization;
    if(!authorization) {
        return response.unauthorized(res, 'User is not authorized');
    }

    const [prefix, accessToken] = authorization.split(' ');
    if (prefix !== 'Bearer' || !accessToken) {
        return response.unauthorized(res, 'User is not authorized');
    }
    
    const user = getUserData(accessToken);
    if(!user) {
        return response.unauthorized(res, 'User is not authorized');
    }
    
    (req as IRequestUser).user = user;

    next();
}