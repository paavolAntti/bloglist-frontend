import React, { useState } from 'react'
import { like, remove } from '../reducers/blogReducer'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'


const Blog = ({ blog, user }) => {
	const [visible, setVisible] = useState(false)
	const dispatch = useDispatch()

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
	}

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}
	const showprops = () => {
	}
	Blog.propTypes = {
		blog: PropTypes.object.isRequired,
		user: PropTypes.object.isRequired
	}

	const basicInfo = `${blog.title} / ${blog.author}`
	const allInfo = (
		<div>
			<div>{blog.url}</div>
			<div>
				likes: {blog.likes}
				<button onClick={ likeBlog } id='like_button'>like</button>
			</div>
			<div>{blog.user.name}</div>
		</div>

	)

	return (
		<div className='blog_container'>
			<div>
				{showprops()}
				{basicInfo}
				<button onClick={ toggleVisibility } style={hideWhenVisible} id='view_button'> view </button>
				<button onClick={ () =>  { toggleVisibility()} } style={showWhenVisible} id='hide_button'> hide </button>
				<div style= {showWhenVisible} className='hidden_content'>
					{ allInfo }
					{ user.username === blog.user.username && <button className='remove_button' id='remove_button' onClick={ removeBlog }> remove </button> }
				</div>
			</div>
		</div>
	)
}

export default Blog