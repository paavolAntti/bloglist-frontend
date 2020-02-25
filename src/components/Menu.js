import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'
import { getUsers } from '../reducers/userReducer'
import Blogs from './Blogs'
import Users from './Users'
import User from './User'
import BlogInfo from './BlogInfo'
import Togglable from './Togglable'
import AddPostForm from './AddPostForm'
import Notification from './Notification'

const Menu = (props) => {
	const dispatch = useDispatch()
	const users = useSelector(state => state.userlist)
	useEffect(() => {
		dispatch(getUsers())
	}, [dispatch])
	const handleLogout =  () => {
		dispatch(logoutUser())
	}
	const postFormRef = React.createRef()
	const postForm = () => (
		<Togglable buttonLabel = 'new post' cancelLabel='cancel' ref={postFormRef}>
			<AddPostForm
				postFormRef={postFormRef}
				user={props.user}
			/>
		</Togglable>
	)

	const padding = {
		paddingRight: 5
	}

	return (
		<div>
			<Router>
				<div>
					<Link style={padding} to='/'>blogs</Link>
					<Link style={padding} to='/users'>users</Link>
					{props.user.name} logged in
					<button onClick={handleLogout} id='logout_button'>logout</button>
				</div>
				<div>
					<h1>blogs</h1>
					<Notification />
				</div>
				<Switch>
					<Route path='/users/:id'>
						<User users={ users }/>
					</Route>
					<Route path='/users'>
						<Users users={ users }/>
					</Route>
					<Route path='/blogs/:id'>
						<BlogInfo blogs={props.blogs} user={props.user}/>
					</Route>
					<Route path='/'>
						<Blogs blogs={ props.blogs } user={props.user} />
						{postForm()}
					</Route>
				</Switch>
			</Router>
		</div>
	)
}

export default Menu