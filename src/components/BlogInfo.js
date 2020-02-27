import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { like, remove } from '../reducers/blogReducer'
import CommentForm from './CommentForm'


const BlogInfo = ({ blogs, user }) => {
	const dispatch = useDispatch()
	const history = useHistory()
	const id = useParams().id
	const blog = blogs.find(b => b.id === id)

	const getId = () => (100000 * Math.random()).toFixed(0)

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

	const comments = () => {
		if (!blog.comments) {
			return null
		}
		console.log(blog.comments)
		return (
			blog.comments
				.map(c =>
					<li key={getId()}>
						{c}
					</li>)
		)
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
			<div>
				<h3>comments</h3>
				<CommentForm blog={blog} />
				<ul>
					{comments()}
				</ul>
			</div>
		</div>
	)
}

export default BlogInfo