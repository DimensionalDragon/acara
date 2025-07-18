import dotenv from "dotenv";

dotenv.config();

export const DATABASE_URL: string = process.env.DATABASE_URL || '';
export const PASSWORD_SECRET: string = process.env.PASSWORD_SECRET || '';
export const CLIENT_HOST: string = process.env.CLIENT_HOST || 'http://localhost:5001';

export const EMAIL_SMTP_SECURE: boolean = Boolean(process.env.EMAIL_SMTP_SECURE) || false;
export const EMAIL_SMTP_PASSWORD: string = process.env.EMAIL_SMTP_PASSWORD || '';
export const EMAIL_SMTP_USER: string = process.env.EMAIL_SMTP_USER || '';
export const EMAIL_SMTP_PORT: number = Number(process.env.EMAIL_SMTP_PORT) || 465;
export const EMAIL_SMTP_HOST: string = process.env.EMAIL_SMTP_HOST || '';
export const EMAIL_SMTP_SERVICE_NAME: string = process.env.EMAIL_SMTP_SERVICE_NAME || '';

export const CLOUDINARY_CLOUD_NAME: string = process.env.CLOUDINARY_CLOUD_NAME || '';
export const CLOUDINARY_API_KEY: string = process.env.CLOUDINARY_API_KEY || '';
export const CLOUDINARY_API_SECRET: string = process.env.CLOUDINARY_API_SECRET || '';