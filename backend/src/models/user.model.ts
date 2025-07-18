import mongoose from "mongoose";
import { encrypt } from "../utils/encryption";
import { sendMail, renderMailHTML } from "../utils/mail/mail";
import { CLIENT_HOST } from "../utils/env";
import { ROLES } from "../utils/constants";

export interface User {
    fullName: string,
    username: string,
    email: string,
    password: string,
    role: string,
    profilePicture: string,
    isActive: boolean,
    activationCode: string,
    createdAt?: string,
}

const Schema = mongoose.Schema;
const UserSchema = new Schema<User>({
    fullName: {
        type: Schema.Types.String,
        required: true,
    },
    username: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    password: {
        type: Schema.Types.String,
        required: true,
    },
    role: {
        type: Schema.Types.String,
        enum: [ROLES.ADMIN, ROLES.MEMBER],
        default: ROLES.MEMBER,
    },
    profilePicture: {
        type: Schema.Types.String,
        default: 'user.jpg',
    },
    isActive: {
        type: Schema.Types.Boolean,
        default: false,
    },
    activationCode: {
        type: Schema.Types.String,
    },
}, 
{
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            delete ret.password;
        }
    }
});

UserSchema.pre('save', function(next) {
    const user = this;
    user.password = encrypt(user.password);
    user.activationCode = encrypt(user.id);
    next();
});

UserSchema.post('save', async function(doc, next) {
    try {
        const user = doc;
        const mailContent = await renderMailHTML(
            'registration-success.ejs',
            {
                username: user.username,
                fullName: user.fullName,
                email: user.email,
                createdAt: user.createdAt,
                activationLink: `${CLIENT_HOST}/auth/activation?code=${user.activationCode}`,
            }
        );

        await sendMail({
            from: 'andhikangurah@zohomail.com', 
            to: user.email,
            subject: 'Aktivasi Akun Anda',
            html: mailContent,
        });
    } catch (error) {
        const err = error as Error;
        console.log(err.message);
    } finally {
        next();
    }
})

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;