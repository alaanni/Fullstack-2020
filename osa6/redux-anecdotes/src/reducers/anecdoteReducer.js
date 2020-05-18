import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {

  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':
      const votedAnecdote = action.data
      return state.map(anecdote =>
        anecdote.id !== votedAnecdote.id ? anecdote : votedAnecdote
      )
    default:
      return state
  }
}


export const initAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch ({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const votedAnecdote = await anecdoteService.updateAnecdote(anecdote.id, newAnecdote)
    dispatch ({
      type: 'VOTE',
      data: votedAnecdote
    })
  }
}

export default reducer