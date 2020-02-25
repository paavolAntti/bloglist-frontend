import React, { useState } from 'react'
import Notification from './Notification'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'

const LoginForm = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useDispatch()

	const login = (event) => {
		event.preventDefault()
		dispatch(loginUser({ username, password }))
		setUsername('')
		setPassword('')
	}

	return (
		<form onSubmit={login}>
			<h1>login</h1>
			<Notification />
			<div>
		username: <input
					id='username'
					type='text'
					value={username}
					name='Username'
					onChange={ ({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
		password: <input
					id='password'
					type='text'
					value={password}
					name='Password'
					onChange={ ({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type='submit' id='login_button'>login</button>
		</form>
	)
}

export default LoginForm