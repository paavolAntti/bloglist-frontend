import React from 'react'
import { useParams } from 'react-router-dom'

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
				<li key={blog.id}>
					{blog.title}
				</li>
			)
		)
	}

	return (
		<div>
			<h2>{user.name}</h2>
			<div>
				<h3>added blogs</h3>
				<ul>
					{showAll()}
				</ul>
			</div>
		</div>
	)
}

export default User