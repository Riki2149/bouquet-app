import axios from "axios"

let baseUrl = "http://localhost:8080/api/users";

export const httpAddUser = (user) =>{
    return axios.post(baseUrl,user)
}

export const httpCheckUser = (user) =>{
    return axios.post(baseUrl+"/getUserByNameAndPassword/",user)
}
