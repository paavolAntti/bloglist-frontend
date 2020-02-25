import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
	const users = await axios.get(baseUrl)
	return users.data
}


const getUser = async (id) => {
	const user = await axios.get(`${baseUrl}/${id}`)
	return user.data
}

export default { getUser, getAll }