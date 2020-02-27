import React, { useState } from 'react'
import { leaveComment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const CommentForm = ({ blog }) => {
	const [comment, setComment] = useState('')

	const dispatch = useDispatch()

	const addComment = (event) => {
		event.preventDefault()
		const commentedBlog = {
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: blog.likes,
			comments: blog.comments.concat(comment)
		}
		dispatch(leaveComment(blog.id, commentedBlog))
		setComment('')
	}

	return (
		<form onSubmit={addComment}>
			<div>
				<input
					id='comment'
					type='text'
					value={comment}
					name='Comment'
					onChange={ ({ target }) => setComment(target.value)}
				/>
				<button type='submit' id='comment_button'>add comment</button>
			</div>
		</form>
	)
}

export default CommentForm
