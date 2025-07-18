import { Response } from "express";
import * as Yup from "yup";

type Pagination = {
    totalPage: number;
    currentPage: number;
}

export default {
    success(res: Response, data: any, message: string) {
        res.status(200).json({
            meta: {
                status: 200,
                message,
            },
            data
        });
    },
    created(res: Response, data: any, message: string) {
        res.status(201).json({
            meta: {
                status: 201,
                message,
            },
            data
        });
    },
    error(res: Response, error: unknown, message: string) {
        if(error instanceof Yup.ValidationError) {
            return res.status(400).json({
                meta: {
                    status: 400,
                    message,
                },
                data: error.errors,
            });
        }
    },
    unauthorized(res: Response, message: string = 'Unauthorized access') {
        res.status(401).json({
            meta: {
                status: 401,
                message,
            },
            data: null,
        });
    },
    forbidden(res: Response, message: string = 'Forbidden access') {
        res.status(403).json({
            meta: {
                status: 403,
                message,
            },
            data: null,
        });
    },
    serverError(res: Response, error: unknown, message: string) {
        const data = (error instanceof Error) ? error : null;
        return res.status(500).json({
            meta: {
                status: 500,
                message,
            },
            data,
        });
    },
    pagination(res: Response, data: any[], pagination: Pagination, message: string) {
        res.status(200).json({
            meta: {
                status: 200,
                message,
            },
            data,
            pagination,
        });
    }
}
