import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'


const AnecdoteList = (props) => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    anecdotes.sort((a,b) => a.votes - b.votes).reverse()

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(voteAnecdote(anecdote.id))
        dispatch(newNotification(`you voted '${anecdote.content}'`))
        setTimeout(() => {
          dispatch(newNotification(''))
        }, 5000)
      }
    
    const filterAnecdotes = () => {
      const filterded = anecdotes.filter((anecdote) => 
      anecdote.content.toLowerCase().includes(filter.toLowerCase()))
      return (
        filterded
      )
    }

    const anecdotesToShow = filterAnecdotes()

    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotesToShow.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
            </div>
            </div>
        )}
      </div>
    )
  
}

export default AnecdoteList