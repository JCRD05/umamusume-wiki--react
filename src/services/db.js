import axios from "axios";

const baseUrl = 'http://localhost:3001'

const getData = (name, configObject = {}) => {
    const request = axios.get(`${baseUrl}/${name}`, configObject)
    return request.then(response => response.data)
}

const addData = (name, data) => {
    const request = axios.post(`${baseUrl}/${name}`, data)
    return request.then(response => response.data)
}

const editData = (data, path) => {
    const request = axios.put(`${baseUrl}/${path}`, data)
    return request.then(response => response.data)
}

const deleteData = path => axios.delete(`${baseUrl}/${path}`)

export default { getData, addData, editData, deleteData }