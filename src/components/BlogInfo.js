import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { like, remove } from '../reducers/blogReducer'


const BlogInfo = ({ blogs, user }) => {
	const dispatch = useDispatch()
	const history = useHistory()
	const id = useParams().id
	const blog = blogs.find(b => b.id === id)

	const likeBlog = () => {
		console.log('blog id: ', blog.id)

		dispatch(like(blog.id, {
			author: blog.author,
			title: blog.title,
			url: blog.url,
			likes: blog.likes + 1,
			user: blog.user
		}))
	}

	const removeBlog = () => {
		if(window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
			dispatch(remove(blog.id, `bearer ${user.token}`))
		}
		history.push('/')
	}

	if(!blog) {
		return null
	}

	return (
		<div>
			<h2>{blog.title} {blog.author}</h2>
			<a href={blog.url}>{blog.url}</a>
			<div>
				likes: {blog.likes}
				<button onClick={ likeBlog } id='like_button'>like</button>
			</div>
			<div>added by {blog.user.name}</div>
			{ user.username === blog.user.username && <button className='remove_button' id='remove_button' onClick={ removeBlog }> remove </button> }
		</div>
	)
}

export default BlogInfo