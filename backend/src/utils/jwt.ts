import jwt from "jsonwebtoken";
import { PASSWORD_SECRET } from "./env";

import { IUserToken } from "./interfaces";

export const generateToken = (user: IUserToken) => {
    const token = jwt.sign(user, PASSWORD_SECRET, {
        expiresIn: '1h',
    });
    return token;
}

export const getUserData = (token: string) => {
    const user = jwt.verify(token, PASSWORD_SECRET) as IUserToken;
    return user;
}