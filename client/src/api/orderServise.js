import axios from "axios"

let baseUrl = "http://localhost:8080/api/orders";

export const httpAddOrder = (order) =>{
    return axios.post(baseUrl,order)
}

