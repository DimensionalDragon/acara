import { Response } from "express";

import uploader from "../utils/uploader";
import { IRequestUser } from "../utils/interfaces";
import response from "../utils/response";

export default {
    async single(req: IRequestUser, res: Response) {
        if(!req.file) {
            const error = new Error(`File doesn't exist`);
            return response.error(res, error, error.message);
        }

        try {
            const result = await uploader.uploadSingle(req.file as Express.Multer.File);
            response.created(res, result, 'Upload success');
        } catch (error) {
            response.serverError(res, error, 'Upload failed');
        }
    },
    async multiple(req: IRequestUser, res: Response) {
        if(!req.files || req.files.length === 0) {
            const error = new Error(`Files doesn't exist`);
            return response.error(res, error, error.message);
        }

        try {
            const result = await uploader.uploadMultiple(req.files as Express.Multer.File[]);
            response.success(res, result, 'Upload success');
        } catch (error) {
            response.serverError(res, error, 'Upload failed');
        }
    },
    async remove(req: IRequestUser, res: Response) {
        try {
            const { fileUrl } = req.body as {fileUrl: string};
            const result = await uploader.remove(fileUrl);
            response.success(res, result, 'File successfully deleted');
        } catch (error) {
            response.serverError(res, error, 'Failed to delete file');
        }
    },
}