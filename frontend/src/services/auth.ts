import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

import { IRegister } from "@/types/auth";

const authServices = {
    register: async (payload: IRegister) => {
        const response = await instance.post(`${endpoint.AUTH}/register`, payload);
        return response;
    }
}

export default authServices;