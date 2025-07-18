import {v2 as cloudinary} from "cloudinary";

import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from "./env";

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

const toDataURL = (file: Express.Multer.File) => {
    const fileAsBase64 = Buffer.from(file.buffer).toString('base64');
    const dataUrl = `data:${file.mimetype};base64,${fileAsBase64}`;
    return dataUrl;
}

const getPublicIdFromFileUrl = (fileUrl: string) => {
    // Current cloudinary URL format is as follows
    // https://res.cloudinary.com/[cloud_name]/image/upload/v1752768596/cld-sample-3.jpg
    // Currently, public ID is just the file name without the extension, so it's "cld-sample-3" in this case
    const fileNameUsingSubstrings = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
    const filePublicId = fileUrl.substring(0, fileNameUsingSubstrings.lastIndexOf('.'));
    return filePublicId;
}

export default {
    async uploadSingle(file: Express.Multer.File) {
        const fileDataURL = toDataURL(file);
        const result = await cloudinary.uploader.upload(fileDataURL, {
            resource_type: 'auto',
        });
        return result;
    },
    async uploadMultiple(files: Express.Multer.File[]) {
        const uploadBatch = files.map(file => {
            const result = this.uploadSingle(file);
            return result;
        });
        const results = await Promise.all(uploadBatch);
        return results;
    },
    async remove(fileUrl: string) {
        // Public ID id the cloudinary ID assigned to the file (not the url)
        const publicId = getPublicIdFromFileUrl(fileUrl);
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    },
};