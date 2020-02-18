import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import AddPostForm from './AddPostForm'


const user = {
	username: 'test user',
	name: 'Test User',
	id: 'testUserGenericID'
}

const blog = {
	user: user,
	likes: 77,
	author: 'TestMan',
	title: 'TestMans diaries',
	url: 'test.com'
}

describe ('<Blog />', () => {

	test ('renders title and author, not url, likes and user`s name', () => {
		const component = render(
			<Blog blog={blog} user={user} />
		)

		const div = component.container.querySelector('.hidden_content')

		expect(component.container).toHaveTextContent(
			'TestMans diaries',
			'TestMan'
		)
		expect(div).toBeDefined()
		expect(div).toHaveStyle('display: none')

	})

	test ('renders url, likes and user`s name when `view` is pressed', () => {
		const component = render(
			<Blog blog={blog} user={user} />
		)
		const viewButton = component.getByText('view')
		fireEvent.click(viewButton)

		const div = component.container.querySelector('.hidden_content')
		expect(div).not.toHaveStyle('display: none')
	})

	test('clicking `like` button twice calls event handler twice', async () => {
		const mockHandler = jest.fn()

		const component = render(
			<Blog blog={blog} user={user} handleLike={mockHandler} />
		)
		const button = component.getByText('like')
		console.log(prettyDOM(button))
		fireEvent.click(button)
		fireEvent.click(button)

		expect(mockHandler.mock.calls.length).toBe(2)
	})

	test('<AddPostForm /> calls event handler with correct information', async () => {
		const mockHandler = jest.fn()

		const component = render(
			<AddPostForm handlePost={mockHandler} />
		)
		const titleInput = component.container.querySelector('#title')
		const authorInput = component.container.querySelector('#author')
		const urlInput = component.container.querySelector('#url')

		const form = component.container.querySelector('form')

		fireEvent.change(
			titleInput, { target: { value: 'test title' } }
		)
		fireEvent.change(
			authorInput, { target: { value: 'test author' } }
		)
		fireEvent.change(
			urlInput, { target: { value: 'test url' } }
		)
		fireEvent.submit(form)
		const mockCalls = mockHandler.mock.calls
		expect(mockCalls.length).toBe(1)

		expect(mockCalls[0][0].title).toBe('test title')
		expect(mockCalls[0][0].author).toBe('test author')
		expect(mockCalls[0][0].url).toBe('test url')
	})
})

