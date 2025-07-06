import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { User } from "../models/user.model";
import { PASSWORD_SECRET } from "./env";

export interface IUserToken extends Omit<User, "password" | "activationCode" | "isActive" | "email" | "fullName" | "profilePicture" | "username"> {
    id?: Types.ObjectId,
}

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