import login from '../services/login'
import { setNotification } from './notificationReducer'
import blogService from '../services/blogs'

export const setUser = (user) => {
	return async dispatch => {
		dispatch({
			type: 'SETUSER',
			data: user
		})
	}
}

export const loginUser = (credentials) => {
	return async dispatch => {
		try {
			const user = await login.login(credentials)
			console.log('user at reducer: ', user.error )
			dispatch({
				type: 'LOGIN',
				data: user
			})
			blogService.setToken(user.token)
		} catch (exception) {
			console.log('exception', exception)
			if (exception.message === 'Request failed with status code 401') {
				dispatch(setNotification('invalid username or password', 5, 'error'))
			}
		}
	}
}

export const logoutUser = () => {
	return async dispatch => {
		dispatch({
			type: 'LOGOUT',
		})
	}
}


const loginReducer = (state = null, action) => {
	switch (action.type) {
	case 'LOGIN':
		console.log('login action data:', action.data)
		window.localStorage.setItem('loggedBlogappUser', JSON.stringify(action.data))
		return action.data
	case 'LOGOUT':
		console.log('nulled witu')
		window.localStorage.removeItem('loggedBlogappUser')
		return null
	case 'SETUSER':
		return action.data
	default:
		return state
	}
}

export default loginReducer