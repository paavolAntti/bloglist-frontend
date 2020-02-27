/* eslint-disable no-case-declarations */
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
import { getUsers } from './userReducer'

export const initialize = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch({
			type: 'INIT',
			data: blogs
		})
	}
}

export const createNew = (content) => {
	return async dispatch => {
		try {
			await blogService.postNew({
				title: content.title,
				author: content.author,
				url: content.url,
				likes: 0
			})
			dispatch(setNotification(`${content.title} by ${content.author} added to bloglist`, 5, 'success'))
		} catch (exception) {
			if (exception.message === 'Request failed with status code 400') {
				dispatch(setNotification('invalid blog post', 5, 'error'))
			}
		}
		const updatedBlogs = await blogService.getAll()
		dispatch({
			type: 'NEW',
			data: updatedBlogs
		})
		dispatch(getUsers())
	}
}

export const like = (id, blogToUpdate) => {
	return async dispatch => {
		const likedBlog = await blogService.updateBlog(id, blogToUpdate)
		dispatch({
			type: 'LIKE',
			data: likedBlog
		})
	}
}

export const leaveComment = (id, blogToUpdate) => {
	return async dispatch => {
		await blogService.commentBlog(id, blogToUpdate)
		const updatedBlogs = await blogService.getAll()
		dispatch({
			type: 'COMMENT',
			data: updatedBlogs
		})
	}
}

export const remove = (id, token) => {
	return async dispatch => {
		const removed = await blogService.removeBlog(id, token)
		dispatch({
			type: 'REMOVE',
			data: {
				headers: removed,
				id: id
			}
		})
	}
}

const sortBLogs = (blogs) => {
	const sorted = blogs.sort((a, b) => {
		let likesA = a.likes
		let likesB = b.likes

		if (likesA > likesB) {
			return -1
		} else if (likesA < likesB) {
			return 1
		}
		return 0
	})
	return sorted
}

const blogReducer = (state = [], action) => {
	switch (action.type) {
	case 'INIT':
		return sortBLogs(action.data)
	case 'NEW':
		return sortBLogs(action.data)
	case 'LIKE':
		const id = action.data.id
		const blog = state.find(b => b.id === id)
		const likedBLog = {
			...blog,
			likes: blog.likes +1
		}
		const updatedBlogs = state.map(b => b.id !== id ? b : likedBLog)
		return sortBLogs(updatedBlogs)
	case 'COMMENT':
		return sortBLogs(action.data)
	case 'REMOVE':
		const removedId = action.data.id
		const updateBlogs = state.filter(b => b.id !== removedId)
		return sortBLogs(updateBlogs)
	default:
		return state
	}
}

export default blogReducer