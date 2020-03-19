import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

const Display = (props) => {
    return (
    <div>
      <h1>{props.head}</h1>
      <p>{props.text}</p>
      <p>has {props.votes} votes</p>
    </div>
    )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(6).fill(0))
  const mostVotedIndex = votes.indexOf(Math.max.apply(null, votes))

  const selectAnecdote = () => {
    const randomAnecdote = Math.floor(Math.random()*props.anecdotesLenght)
    setSelected(randomAnecdote)
  }
  
  const giveVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <Display head="Anecdote of the day" text= {props.anecdotes[selected]}
       votes= {votes[selected]}/>
      <Button text="vote" handleClick={giveVote} />
      <Button text="next anecdote" handleClick={selectAnecdote}/>
      <Display head="Anecdote with most votes" text= {props.anecdotes[mostVotedIndex]}
       votes= {votes[mostVotedIndex]}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} anecdotesLenght={anecdotes.length}/>,
  document.getElementById('root')
)
