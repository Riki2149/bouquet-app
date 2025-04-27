import axios from "axios"

let baseUrl = "http://localhost:8080/api/flowers";

export const httpGetAllFlower = (page) => {
    return axios.get(baseUrl + "?&page=" + page)
}

export const httpGetOneFlower = (flowerId) => {
    return axios.get(baseUrl + "/" + flowerId)
}

export const httpGetCountPages = () => {
    return axios.get(baseUrl + "/count?")
}

export const httpAddFlower = (flower) => {
    return axios.post(baseUrl, flower)
}

export const httpDeleteFlower = (flowerId) => {
    return axios.delete(baseUrl + "/" + flowerId)
}

export const httpUpdateFlower = (flowerId, flower) => {
    return axios.put(baseUrl + "/" + flowerId, flower)
}