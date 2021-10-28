import axios from "axios";
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data )
}

const create = newPerson => {
    const request =  axios.post(baseURL, newPerson)
    return request.then(response => response.data)
}

const deleteThisPerson = id => {
    const request = axios.delete(`http://localhost:3001/persons/${id}`)
    return request.then(response => response.status)
} 

const update = (id, newPerson) => {
    const request = axios.put(`${baseURL}/${id}`, newPerson)
    return request.then(response => response.status)
}

export default { getAll, create, deleteThisPerson, update}