import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

import { IActivation, ILogin, IRegister } from "@/types/Auth";

const authServices = {
    register: async (payload: IRegister) => {
        const response = await instance.post(`${endpoint.AUTH}/register`, payload);
        return response;
    },
    activation: async (payload: IActivation) => {
        const response = await instance.post(`${endpoint.AUTH}/activation`, payload);
        return response;
    },
    login: async (payload: ILogin) => {
        const response = await instance.post(`${endpoint.AUTH}/login`, payload);
        return response;
    },
    getProfileWithToken: async (token: string) => {
        const response = await instance.get(`${endpoint.AUTH}/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response;
    },
}

export default authServices;