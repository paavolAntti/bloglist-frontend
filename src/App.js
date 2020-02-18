import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import AddPostForm from './components/AddPostForm'
import Togglable from './components/Togglable'
import handlers from './helpers/handlers'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] =  useState(null)
	const [notification, setNotification] = useState('')
	const [noteStyle, setNoteStyle] = useState('')

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		)
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
		}
	}, [])

	const refreshBlogs = async () => {
		const blogs = await blogService.getAll()
		setBlogs(blogs)
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
			setNotification('invalid username or password')
			setTimeout(() => {
				setNotification(null)
			}, 2500)
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
			await blogService.postNew({
				title: blogObject.title,
				author: blogObject.author,
				url: blogObject.url })
			setNoteStyle('success')
			setNotification(`${blogObject.title} by ${blogObject.author} added to bloglist`)
			setTimeout(() => {
				setNotification(null)
			}, 2500)
			refreshBlogs()
		} catch (exception) {
			setNoteStyle('error')
			setNotification(exception.message)
			setTimeout(() => {
				setNotification(null)
			}, 2500)
			console.error(exception)
		}
	}

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<h1>login</h1>
			<Notification message={notification} style={noteStyle} />
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
	const showSortedBlogs = () => {
		let blogsToSort = [...blogs]
		blogsToSort.sort((a, b) => {
			let likesA = a.likes
			let likesB = b.likes

			if (likesA > likesB) {
				return -1
			} else if (likesA < likesB) {
				return 1
			}
			return 0
		})
		return (
			blogsToSort.map(blog =>
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
			<Notification message={notification} style={noteStyle} />
			<div>
				{user.name} logged in
				<button onClick={handleLogout} id='logout_button'>logout</button>
			</div>
			<div id='bloglist'>
				{showSortedBlogs()}
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