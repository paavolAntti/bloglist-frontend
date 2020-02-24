let timeoutID

export const setNotification = (message, freezetime) => {
	return async dispatch => {
		dispatch({
			type: 'NOTE',
			data: {
				message: message
			}
		})
		clearTimeout(timeoutID)
		timeoutID = setTimeout(() => {
			dispatch(setNull())
		}, freezetime*1000)
	}
}

const setNull = () => {
	return {
		type: 'NULL'
	}
}

const notificationReducer = (state = null, action) => {
	switch (action.type) {
	case 'NOTE':
		return action.data
	case 'NULL':
		return null
	default:
		return state
	}
}

export default notificationReducer