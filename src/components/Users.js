import React from 'react'
import { Link } from 'react-router-dom'
import {
	Table,
	TableBody,
	TableContainer,
	Paper,
	TableCell,
	TableRow
} from '@material-ui/core'


const SingleUser = ({ user }) => {
	console.log('user at USER component')
	return (
		<TableRow>
			<TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
			<TableCell>{user.blogs.length}</TableCell>
		</TableRow>
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
			<TableContainer component={Paper}>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>
								user
							</TableCell>
							<TableCell>
								blogs created
							</TableCell>
						</TableRow>
						{showAll()}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}

export default Users