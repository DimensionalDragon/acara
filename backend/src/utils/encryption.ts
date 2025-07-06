import crypto from "crypto";
import { PASSWORD_SECRET } from "./env";

export const encrypt = (password: string): string => {
    const encryptedPassword = crypto.pbkdf2Sync(password, PASSWORD_SECRET, 1000, 64, 'sha512').toString('hex');
    return encryptedPassword;
}
