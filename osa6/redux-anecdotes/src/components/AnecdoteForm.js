import React from 'react'
import { useDispatch } from 'react-redux'
import { createAncdote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAncdote(content))
        dispatch(newNotification(`you added '${content}'`))
        setTimeout(() => {
          dispatch(newNotification(''))
        }, 5000)
    }

    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form>
      </div>
    )
  
}

export default AnecdoteForm