import React, { useState } from 'react'
import { leaveComment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { TextField, Button } from '@material-ui/core'

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
				<TextField
					label='add your comment'
					id='comment'
					type='text'
					value={comment}
					name='Comment'
					onChange={ ({ target }) => setComment(target.value)}
				/>
				<Button variant='contained' color='default' type='submit' id='comment_button'>comment</Button>
			</div>
		</form>
	)
}

export default CommentForm
