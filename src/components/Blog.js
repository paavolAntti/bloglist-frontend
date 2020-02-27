import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

	return (
		<div className='blog_container'>
			<div>
				<Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
			</div>
		</div>
	)
}

export default Blog