import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Menu from './components/Menu'
import LoginForm from './components/LoginForm'
import { initialize } from './reducers/blogReducer'
import { setUser } from './reducers/loginReducer'


const App = () => {

	const dispatch = useDispatch()
	const blogs = useSelector(state => state.blogs)
	const user = useSelector(state => state.user)

	useEffect(() => {
		dispatch(initialize())
	}, [dispatch])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const userToLog = JSON.parse(loggedUserJSON)
			dispatch(setUser(userToLog))

		}
	}, [dispatch])

	return (
		<div>
			<div>
				{!user && <LoginForm />}
				{user && blogs && <Menu
					user={user}
					blogs={blogs}
				/>}
			</div>




		</div>
	)
}

export default App