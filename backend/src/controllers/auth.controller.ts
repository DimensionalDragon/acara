import { Request, Response } from "express";
import * as Yup from "yup";

import UserModel from "../models/user.model";
import { encrypt } from "../utils/encryption";
import { generateToken } from "../utils/jwt";
import { IRequestUser } from "../middlewares/auth.middleware";

type TRegisterPayload = {
    fullName: string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
}

type TLoginPayload = {
    identifier: string,
    password: string,
}

const registerValidationSchema = Yup.object({
    fullName: Yup.string().required(),
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required(),
    confirmPassword: Yup.string().required().oneOf([Yup.ref('password'), ''], 'confirmPassword must match password'),
});

const loginValidationSchema = Yup.object({
    identifier: Yup.string().required(),
    password: Yup.string().required(),
});

export default {
    register: async (req: Request, res: Response) => {
        const {fullName, username, email, password, confirmPassword} = req.body as TRegisterPayload;
        try {
            await registerValidationSchema.validate({fullName, username, email, password, confirmPassword});
            
            const createdUser = await UserModel.create({fullName, username, email, password})
            return res.status(200).json({message: 'Registration success', data: createdUser});
        } catch (error) {
            const err = error as Error;
            res.status(400).json({message: err.message, data: null});
        }
    },
    login: async (req: Request, res: Response) => {
        /**
         #swagger.requestBody = {
            required: true,
            schema: {$ref: "#/components/schemas/LoginRequest"}
         }
         */
        try {
            // Identifier could be username or email
            const {identifier, password} = req.body as TLoginPayload;
            await loginValidationSchema.validate({identifier, password});

            const userByIdentifier = await UserModel.findOne({
                $or: [
                    {email: identifier},
                    {username: identifier},
                ],
            });

            if(!userByIdentifier) {
                res.status(401).json({message: 'Credentials are incorrect', data: null});
            }

            const isPasswordValid: boolean = encrypt(password) === userByIdentifier?.password;
            if(!isPasswordValid) {
                res.status(401).json({message: 'Credentials are incorrect', data: null});
            }

            const token = generateToken({
                id: userByIdentifier!._id,
                role: userByIdentifier!.role,
            });

            res.status(200).json({message: 'Login success', data: token});
        } catch (error) {
            const err = error as Error;
            res.status(400).json({message: err.message, data: null});
        }
    },
    me: async (req: IRequestUser, res: Response) => {
        /**
         #swagger.security = [{
            "bearerAuth": []
         }]
         */
        try {
            const user = req.user;
            const result = await UserModel.findById(user?.id);
            res.status(200).json({message: 'User profile successfully fetched', data: result})
        } catch (error) {
            const err = error as Error;
            res.status(400).json({message: err.message, data: null});
        }
    }
}