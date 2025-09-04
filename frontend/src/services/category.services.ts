import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const categoryServices = {
    getCategories: async (params?: string) => {
        const response = await instance.get(`${endpoint.CATEGORY}?${params}`);
        return response;
    },
}

export default categoryServices;