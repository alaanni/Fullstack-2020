const reducer = (state = { content: '', timer: null }, action) => {
  switch(action.type) {
    case 'NEW_NOTIFICATION':
      if (state.timer !== null) {
        clearTimeout(state.timer)
      }
      return { 
        content: action.data.content, 
        timer: action.data.timer 
      }
    case 'CLEAR_NOTIFICATION':
      return {
        content: '',
        timer: null
      }
    default:
      return state
  }
}

export const newNotification = (content, sec) => {
  return async dispatch => {
    const timer = setTimeout(() => {
      dispatch(clearNotification())
    }, sec * 1000)
    dispatch ({
      type: 'NEW_NOTIFICATION',
      data: { 
        content,
        timer
      }
    })
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default reducer