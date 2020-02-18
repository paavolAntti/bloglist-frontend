import React, { useState } from 'react'

const AddPostForm = ({ handlePost }) => {

	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const addPost = (event) => {
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

	return (
		<form onSubmit={addPost}>
			<h1>new blog post</h1>
			<div>
				title: <input
					id='title'
					type='text'
					value={title}
					name='Title'
					onChange={ ({ target }) => setTitle(target.value) }
				/>
			</div>
			<div>
				author: <input
					id='author'
					type='text'
					value={author}
					name='Author'
					onChange={ ({ target }) => setAuthor(target.value) }
				/>
			</div>
			<div>
				url: <input
					id='url'
					type='text'
					value={url}
					name='Url'
					onChange={ ({ target }) => setUrl(target.value) }
				/>
			</div>
			<button type='submit' id='post_button'> post </button>
		</form>
	)
}

export default AddPostForm