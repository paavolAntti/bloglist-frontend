import React from 'react'
import { Link } from 'react-router-dom'


const SingleUser = ({ user }) => {
	console.log('user at USER component')
	return (
		<tr>
			<td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
			<td>{user.blogs.length}</td>
		</tr>
	)

}

const Users = ({ users }) => {

	const showAll = () => {
		return (
			users.map(u =>
				<SingleUser key={u.id}
					user={u} />
			)
		)
	}

	return (
		<div>
			<h2>Users</h2>
			<table>
				<thead>
					<tr>
						<td></td>
						<th>blogs created</th>
					</tr>
				</thead>
				<tbody>
					{showAll()}
				</tbody>
			</table>
		</div>
	)
}

export default Users