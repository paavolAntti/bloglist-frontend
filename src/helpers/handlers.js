import blogService from '../services/blogs'

const handleLike = async (blog, likes) => {
	try {
		console.log('blog id to like: ', blog.id)
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
		console.log(blog.id)
		try {
			const token = `bearer ${user.token}`
			console.log(user.token)
			await blogService.removeBlog(blog.id, token)
			refreshHandler()
		} catch (exception) {
			console.error(exception)
		}
	}
}

export default { handleLike , handleDelete }