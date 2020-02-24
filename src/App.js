import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import AddPostForm from './components/AddPostForm'
import Togglable from './components/Togglable'
import handlers from './helpers/handlers'
import { setNotification } from './reducers/notificationReducer'
import { initialize, createNew } from './reducers/blogReducer'

const App = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] =  useState(null)
	const [noteStyle, setNoteStyle] = useState('')

	const dispatch = useDispatch()
	const blogs = useSelector(state => state.blogs)

	useEffect(() => {
		dispatch(initialize())
	}, [dispatch])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
		}
	}, [])
	const createNewBlog = (blogObject) => {
		dispatch(createNew(blogObject))
	}

	const refreshBlogs = () => {
		dispatch(initialize())
	}

	const notify = (message) => {
		console.log('message: ', message)
		dispatch(setNotification(message, 5))
	}

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const userToLogin= await loginService.login({
				username,password,
			})
			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(userToLogin))
			blogService.setToken(userToLogin.token)
			console.log(username)
			setUser(userToLogin)
			setUsername('')
			setPassword('')
			console.log('logging in with', username, password)
		} catch (exception) {
			setNoteStyle('error')
			notify('invalid username or password')
			console.error(exception.message)
		}
	}


	const handleLogout =  () => {
		window.localStorage.removeItem('loggedBlogappUser')
		setUser(null)
	}
	const handlePost = async (blogObject) => {
		postFormRef.current.toggleVisibility()
		try {
			blogService.setToken(user.token)
			setNoteStyle('success')
			console.log('user:', blogObject.user)
			createNewBlog(blogObject)
			notify(`${blogObject.title} by ${blogObject.author} added to bloglist`)
		} catch (exception) {
			setNoteStyle('error')
			notify(exception.message)
			console.error(exception)
		}
	}

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<h1>login</h1>
			<Notification style={noteStyle} />
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
					refreshHandler={refreshBlogs}
					handleLike={handlers.handleLike}
					handleDelete={handlers.handleDelete}
				/>
			)
		)
	}

	const showPosts = () => (
		<div>
			<h1>blogs</h1>
			<Notification style={noteStyle} />
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
				{user !== null && postForm()}
			</div>




		</div>
	)
}

export default App