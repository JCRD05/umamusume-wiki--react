import axios from "axios";

const baseUrl = 'http://localhost:3001'

const getData = (name, configObject = {}) => {
    const request = axios.get(`${baseUrl}/${name}`, configObject)
    return request.then(response => response.data)
}

export default { getData }