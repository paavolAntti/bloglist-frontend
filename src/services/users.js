import axios from 'axios'
const baseUrl = '/api/blogs'

const getUser = async (id) => {
	const user = await axios.get(`${baseUrl}/${id}`)
	return user.data
}

export default { getUser }