import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

import { IActivation, IRegister } from "@/types/Auth";

const authServices = {
    register: async (payload: IRegister) => {
        const response = await instance.post(`${endpoint.AUTH}/register`, payload);
        return response;
    },
    activation: async (payload: IActivation) => {
        const response = await instance.post(`${endpoint.AUTH}/activation`, payload);
        return response;
    }
}

export default authServices;