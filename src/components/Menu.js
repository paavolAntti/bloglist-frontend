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
import { AppBar, Toolbar, Button } from '@material-ui/core'

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

	return (
		<div>
			<Router>
				<AppBar position='static'>
					<Toolbar>
						<Button color='inherit' component={Link} to='/'>
							blogs
						</Button>
						<Button color='inherit' component={Link} to='/users'>
							users
						</Button>
						<Button color='inherit' onClick={handleLogout}>
							log out
						</Button>
						{props.user.name} logged in
					</Toolbar>
				</AppBar>
				<div>
					<h1>BLOG APP</h1>
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