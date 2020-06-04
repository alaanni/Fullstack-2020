const notificationReducer = (state = { content: '', timer: null, error: false }, action) => {
  switch(action.type) {
  case 'NEW_NOTIFICATION':
    if (state.timer !== null) {
      clearTimeout(state.timer)
    }
    return {
      content: action.data.content,
      timer: action.data.timer,
      error: action.data.error
    }
  case 'CLEAR_NOTIFICATION':
    return {
      content: '',
      timer: null,
      error: false
    }
  default:
    return state
  }
}

export const newNotification = (content, error, sec) => {
  return async dispatch => {
    const timer = setTimeout(() => {
      dispatch(clearNotification())
    }, sec * 1000)
    dispatch ({
      type: 'NEW_NOTIFICATION',
      data: {
        content,
        timer,
        error
      }
    })
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default notificationReducer