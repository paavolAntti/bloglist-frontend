import React from 'react'
import '../styles/Style.css'
import { useSelector } from 'react-redux'


const Notification = () => {
	const notification = useSelector(state => state.notification)
	if (notification === null) {
		return null
	}

	return (
		<div className={notification.style} id='notification'>
			{notification.message}
		</div>
	)
}

export default Notification