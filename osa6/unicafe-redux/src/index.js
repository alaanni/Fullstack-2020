import React from 'react';
import ReactDOM from 'react-dom'
import Button from './components/Button'
import Statistics from './components/Statistics'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {

  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  console.log(store.getState())

    return (
        <div>
        <h1>give feedback</h1>
        <Button
            handleClick={good}
            text="good"
            />
        <Button
            handleClick={ok}
            text="neutral"
            />
        <Button
            handleClick={bad}
            text="bad"
            />
        <Button
            handleClick={zero}
            text="reset stats"
            />    

        <h1>statistics</h1>
        <Statistics
        goods={store.getState().good}
        bads={store.getState().ok}
        neutrals={store.getState().bad}/>

        </div>
    )
}

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
  }
  
  renderApp()
  store.subscribe(renderApp)
