import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
  
  const addPerson = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
  }
  
  const update = (id, newPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, newPerson)
    return request.then(response => response.data)
  }
  const deletePerson = id => {
      return (
          axios.delete(`${baseUrl}/${id}`)
      )
  }
  
  export default { getAll, addPerson, update, deletePerson }