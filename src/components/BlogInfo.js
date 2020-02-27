import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { like, remove } from '../reducers/blogReducer'
import CommentForm from './CommentForm'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import {
	Table,
	TableBody,
	TableContainer,
	Paper,
	TableCell,
	TableRow,
	Button
} from '@material-ui/core'


const BlogInfo = ({ blogs, user }) => {
	const dispatch = useDispatch()
	const history = useHistory()
	const id = useParams().id
	const blog = blogs.find(b => b.id === id)

	const getId = () => (100000 * Math.random()).toFixed(0)

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
		history.push('/')
	}

	const comments = () => {
		if (!blog.comments) {
			return null
		}
		console.log(blog.comments)
		return (
			blog.comments
				.map(c =>
					<ListItem key={getId()}>
						{c}
					</ListItem>)
		)
	}

	if(!blog) {
		return null
	}

	return (
		<div>
			<h2>{blog.title} {blog.author}</h2>
			<TableContainer component={Paper}>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>
								more info at
							</TableCell>
							<TableCell>
								<a href={blog.url}>{blog.url}</a>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								blog likes
							</TableCell>
							<TableCell>
								{blog.likes}
								<Button variant='text' color='primary' onClick={ likeBlog } id='like_button'>like</Button>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								added by
							</TableCell>
							<TableCell>
								{blog.user.name}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
			<div>
				{ user.username === blog.user.username && <Button variant='contained' color='secondary' onClick={ removeBlog }> remove </Button> }
			</div>
			<div>
				<h3>comments</h3>
				<CommentForm blog={blog} />
				<List>
					{comments()}
				</List>
			</div>
		</div>
	)
}

export default BlogInfo