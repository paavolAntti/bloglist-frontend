import blogService from '../services/blogs'

const handleLike = async (blog, likes) => {
	try {
		const likedBlog = {
			user: blog.user.id,
			likes: likes + 1,
			author: blog.author,
			title: blog.title,
			url: blog.url
		}
		blogService.updateBlog(blog.id, likedBlog)
	} catch (exception) {
		console.error(exception.message)
	}
}

const handleDelete = async (blog, user,refreshHandler) => {
	if(window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
		try {
			const idToDelete = blog.id
			const token = `bearer ${user.token}`
			console.log(user.token)
			await blogService.removeBlog(idToDelete, token)
			refreshHandler()
		} catch (exception) {
			console.error(exception)
		}
	}
}

export default { handleLike , handleDelete }