/* eslint-disable no-case-declarations */
import blogService from '../services/blogs'

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
		await blogService.postNew({
			title: content.title,
			author: content.author,
			url: content.url,
			likes: 0
		})
		const updatedBlogs = await blogService.getAll()
		dispatch({
			type: 'NEW',
			data: updatedBlogs
		})
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
	case 'REMOVE':
		const removedId = action.data.id
		const updateBlogs = state.filter(b => b.id !== removedId)
		return sortBLogs(updateBlogs)
	default:
		return state
	}
}

export default blogReducer