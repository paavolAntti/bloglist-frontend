import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import AddPostForm from './components/AddPostForm'
import Togglable from './components/Togglable'
//import handlers from './helpers/handlers'
import Menu from './components/Menu'
import { setNotification } from './reducers/notificationReducer'
import { initialize, createNew } from './reducers/blogReducer'
import { loginUser, logoutUser, setUser } from './reducers/loginReducer'


const App = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

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

	const createNewBlog = (blogObject) => {
		dispatch(createNew(blogObject))
	}

	const notify = (message, style) => {
		console.log('message: ', message)
		dispatch(setNotification(message, 5, style))
	}
	const login = (event) => {
		event.preventDefault()
		dispatch(loginUser({ username, password }))
		setUsername('')
		setPassword('')
		console.log('user at login:', user)
	}

	const handleLogout =  () => {
		//window.localStorage.removeItem('loggedBlogappUser')
		console.log('user:', user)
		dispatch(logoutUser())
	}
	const handlePost = async (blogObject) => {
		postFormRef.current.toggleVisibility()
		try {
			blogService.setToken(user.token)
			console.log('user:', blogObject.user)
			createNewBlog(blogObject)
			notify(`${blogObject.title} by ${blogObject.author} added to bloglist`, 'success')
		} catch (exception) {
			notify(exception.message, 'error')
			console.error(exception)
		}
	}

	const loginForm = () => (
		<form onSubmit={login}>
			<h1>login</h1>
			<Notification />
			<div>
			username: <input
					id='username'
					type='text'
					value={username}
					name='Username'
					onChange={ ({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
			password: <input
					id='password'
					type='text'
					value={password}
					name='Password'
					onChange={ ({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type='submit' id='login_button'>login</button>
		</form>
	)
	const postFormRef = React.createRef()

	const postForm = () => (
		<Togglable buttonLabel = 'new post' cancelLabel='cancel' ref={postFormRef}>
			<AddPostForm
				handlePost={handlePost}
			/>
		</Togglable>
	)
	const showBlogs = () => {
		return (
			blogs.map(blog =>

				<Blog
					key={blog.id}
					blog={blog}
					user={user}
				/>
			)
		)
	}

	const showPosts = () => (
		<div>
			<h1>blogs</h1>
			<Notification />
			<div>
				{user.name} logged in
				<button onClick={handleLogout} id='logout_button'>logout</button>
			</div>
			<div id='bloglist'>
				{showBlogs()}
			</div>
		</div>
	)

	return (
		<div>
			<div>
				{user === null && loginForm()}
				{user !== null && showPosts()}
				<Menu/>
				{user !== null && postForm()}
			</div>




		</div>
	)
}

export default App