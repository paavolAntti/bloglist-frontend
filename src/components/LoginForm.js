import React, { useState } from 'react'
import Notification from './Notification'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'
import { TextField, Button } from '@material-ui/core'

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
		<div>
			<h1>login</h1>
			<form onSubmit={login}>
				<Notification />
				<div>
					<TextField
						label='username'
						value={username}
						name='Username'
						onChange={ ({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					<TextField
						label='password'
						type='password'
						value={password}
						name='Password'
						onChange={ ({ target }) => setPassword(target.value)}
					/>
				</div>
				<Button variant='contained' color='primary' type='submit' id='login_button'>login</Button>
			</form>
		</div>
	)
}

export default LoginForm