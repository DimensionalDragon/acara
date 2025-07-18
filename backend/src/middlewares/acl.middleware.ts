import {Response, NextFunction} from "express";
import { IRequestUser } from "../utils/interfaces";
import response from "../utils/response";

export default (roles: string[]) => {
    return (req: IRequestUser, res: Response, next: NextFunction) => {
        const role = req.user?.role;
        if(!role || !roles.includes(role)) {
            return response.forbidden(res, 'Forbidden access');
        }
        
        next();
    }
}