import { api } from ".";

export const inquiryApi={
    create : async (data)=>{
        const res = await api.post("/inquiry/create", data);
        return res.data;
    }
}