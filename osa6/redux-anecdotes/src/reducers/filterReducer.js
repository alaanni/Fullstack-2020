const reducer = (state = '', action) => {
    console.log('state now: ', state)
      console.log('action', action)
      switch(action.type) {
        case 'SET_FILTER':
          return action.filter
        default:
          return state
      }
    }
    export const newFilter = filter => {
      return {
        type: 'SET_FILTER',
        filter
      }
    }
    
    export default reducer