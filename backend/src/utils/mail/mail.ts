import nodemailer from "nodemailer";
import ejs from "ejs";
import fs from "fs";
import path from "path";

import {
    EMAIL_SMTP_SECURE,
    EMAIL_SMTP_PASSWORD,
    EMAIL_SMTP_USER,
    EMAIL_SMTP_PORT,
    EMAIL_SMTP_HOST,
    EMAIL_SMTP_SERVICE_NAME
} from "../env";

export interface ISendMail {
    from: string;
    to: string;
    subject: string;
    html: string;
}

const transporter = nodemailer.createTransport({
    service: EMAIL_SMTP_SERVICE_NAME,
    host: EMAIL_SMTP_HOST,
    port: EMAIL_SMTP_PORT,
    secure: EMAIL_SMTP_SECURE,
    auth : {
        user: EMAIL_SMTP_USER,
        pass: EMAIL_SMTP_PASSWORD,
    },
    requireTLS: true,
});

export const sendMail = async (mailParams: ISendMail) => {
    const result = await transporter.sendMail(mailParams);
    return result;
}

export const renderMailHTML = async (template: string, data: any): Promise<string> => {
    const css = fs.readFileSync(
        path.join(__dirname, `templates/${template.replace('ejs', 'css')}`),
        'utf-8',
    );

    const content = await ejs.renderFile(
        path.join(__dirname, `templates/${template}`),
        {...data, css}
    );
    return content as string;
}