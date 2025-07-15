import axios from "axios";
import { SessionExtended } from "@/types/Auth";
import { getSession } from "next-auth/react";
import env from "@/config/env";

const headers = {
    "Content-Type": "application/json",
};

const instance = axios.create({
    baseURL: env.API_URL,
    headers,
    timeout: 60 * 1000,
});

instance.interceptors.request.use(
    async (request) => {
        const session: SessionExtended | null = await getSession();
        if(session && session.accessToken) {
            request.headers.Authorization = `Bearer ${session.accessToken}`;
        }
        return request;
    },
    (error) => Promise.reject(error),
);

instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
);

export default instance;