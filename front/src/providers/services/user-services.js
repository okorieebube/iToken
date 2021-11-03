import { Request } from "../api/http";

export const userService = {
    signup
}


const authHeaders = {
    'Accept' : 'application/json',
    'Content-Type' : 'application/json',
}

async function signup(data, type) {
    const request = {
        config: {
            headers : authHeaders
        },
        payload: data
    }
    return await Request.post(`${type}/signup`, request)
}