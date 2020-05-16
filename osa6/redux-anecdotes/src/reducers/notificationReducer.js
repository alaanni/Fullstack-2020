const reducer = (state = '', action) => {
console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'NEW_NOTIFICATION':
      return action.data.content
    default:
      return state
  }
}
export const newNotification = (content) => {
  return {
    type: 'NEW_NOTIFICATION',
    data: { content }
  }
}

export default reducer