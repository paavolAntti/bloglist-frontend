import React from 'react'
import Blog from './Blog'
import {
	Table,
	TableBody,
	TableContainer,
	Paper,
} from '@material-ui/core'

const Blogs = ({ blogs, user }) => {
	return (
		<TableContainer component={Paper}>
			<Table>
				<TableBody>
					{blogs.map(blog =>
						<Blog
							key={blog.id}
							blog={blog}
							user={user}
						/>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	)

}

export default Blogs