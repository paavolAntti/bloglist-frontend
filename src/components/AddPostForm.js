import React, { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/blogReducer'
import { TextField, Button } from '@material-ui/core'

const AddPostForm = ( { postFormRef, user }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const dispatch = useDispatch()

	const createNewBlog = (blogObject) => {
		try {
			dispatch(createNew(blogObject))
		} catch (exception) {
			console.log(exception.message)
		}
	}
	const handlePost = async (blogObject) => {
		postFormRef.current.toggleVisibility()
		blogService.setToken(user.token)
		console.log('user:', blogObject.user)
		createNewBlog(blogObject)

	}

	const addPost = async (event) => {
		event.preventDefault()
		handlePost({
			title: title,
			author: author,
			url: url
		})
		setAuthor('')
		setTitle('')
		setUrl('')
	}
	const style = {
		display: 'inline'
	}

	return (
		<div style={style}>
			<h1>new blog post</h1>
			<form onSubmit={addPost} id='postform'>
				<div>
					<TextField
						label='title'
						id='title'
						type='text'
						value={title}
						name='Title'
						onChange={ ({ target }) => setTitle(target.value) }
					/>
				</div>
				<div>
					<TextField
						label='author'
						id='author'
						type='text'
						value={author}
						name='Author'
						onChange={ ({ target }) => setAuthor(target.value) }
					/>
				</div>
				<div>
					<TextField
						label='url'
						id='url'
						type='text'
						value={url}
						name='Url'
						onChange={ ({ target }) => setUrl(target.value) }
					/>
				</div>
			</form>
			<Button form='postform' variant='contained' color='default' type='submit' id='post_button'> post </Button>
		</div>
	)
}

export default AddPostForm