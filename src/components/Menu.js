import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Users from './Users'

const Menu = () => {
	return (
		<Router>
			<Switch>
				<Route path='/users'>
					<Users/>
				</Route>
			</Switch>
		</Router>
	)
}

export default Menu