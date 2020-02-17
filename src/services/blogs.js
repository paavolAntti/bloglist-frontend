import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const postNew = async newPost => {
	const config = {
		headers: { authorization: token }
	}
	const response = await axios.post(baseUrl, newPost, config)
	return response.data
}

const updateBlog = async (id, blogToUpdate) => {
	const response = await axios.put(`${baseUrl}/${id}`, blogToUpdate)
	return response
}

const removeBlog = async (id, currentToken) => {
	const config = {
		headers: { authorization: currentToken }
	}
	const url = `${baseUrl}/${id}`
	console.log(url)
	console.log(config)
	const response = await axios.delete(url,config)
	return response.headers
}
export default { getAll, postNew, setToken, updateBlog, removeBlog }