import React from 'react'
import { useParams } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

const User = ({ users }) => {
	const id = useParams().id
	const user = users.find(u => u.id === id)
	console.log('user at User Comp', user)

	if(!user) {
		return null
	}
	const showAll = () => {
		return (
			user.blogs.map(blog =>
				<ListItem key={blog.id}>
					{blog.title}
				</ListItem>
			)
		)
	}

	return (
		<div>
			<h2>{user.name}</h2>
			<div>
				<h3>added blogs</h3>
				<List>
					{showAll()}
				</List>
			</div>
		</div>
	)
}

export default User