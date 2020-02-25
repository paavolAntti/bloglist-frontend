import React, { useEffect } from 'react'
import { getUsers } from '../reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'

const User = ({ user }) => {
	console.log('user at USER component')
	return (
		<tr>
			<td>{user.name}</td>
			<td>{user.blogs.length}</td>
		</tr>
	)

}

const Users = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getUsers())
	}, [dispatch])

	const users = useSelector(state => state.userlist)
	const showAll = () => {
		return (
			users.map(u =>
				<User key={u.id}
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