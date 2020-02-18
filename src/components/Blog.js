import React, { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, user, refreshHandler, handleLike, handleDelete }) => {
	const [visible, setVisible] = useState(false)
	const [likes, setLikes] = useState(blog.likes)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
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
				likes: {likes}
				<button onClick={ () => {setLikes(likes + 1); handleLike(blog, likes)  } } id='like_button'>like</button>
			</div>
			<div>{blog.user.name}</div>
		</div>

	)

	return (
		<div className='blog_container'>
			<div>
				{basicInfo}
				<button onClick={ toggleVisibility } style={hideWhenVisible} id='view_button'> view </button>
				<button onClick={ () =>  { toggleVisibility(); refreshHandler() } } style={showWhenVisible} id='hide_button'> hide </button>
				<div style= {showWhenVisible} className='hidden_content'>
					{ allInfo }
					{ user.username === blog.user.username && <button className='remove_button' id='remove_button' onClick={ () => { handleDelete(blog, user, refreshHandler)} }> remove </button> }
				</div>
			</div>
		</div>
	)
}

export default Blog