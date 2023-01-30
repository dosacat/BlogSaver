import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs/'

let token = null;

const setToken = newToken => {  
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data;
}

const createBlog = async (newBlog) => {
  const config = {    
    headers: { Authorization: token },
    }
  const response = await axios.post(baseUrl, newBlog, config)  
  return response.data
}

const delBlog = async (id)=> {
  const config = {    
    headers: { Authorization: token },
    }
  const response = await axios.delete(`${ baseUrl }/${id}`, config)  
  return response.data
}

const update = (id, newBlog) => {
  const request = axios.put(`${ baseUrl }/${id}`, newBlog)
  return request.then(response => response.data)
}

export default { getAll, createBlog, setToken, update , delBlog }