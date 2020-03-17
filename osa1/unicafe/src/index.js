import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
    return (
    <button onClick={props.handleClick}>
    {props.text}
    </button>
    )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td> 
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
    if (props.goods + props.bads + props.neutrals === 0) {
      return (
        <p>No feedback given</p>
      )
    }
    else {
    return (
    <table>
      <tbody>
      <StatisticLine text="good" value ={props.goods} />
      <StatisticLine text="neutral" value ={props.neutrals} />
      <StatisticLine text="bad" value ={props.bads} />
      <StatisticLine text="all" value ={props.goods + props.bads + props.neutrals} />
      <StatisticLine text="average" value ={(-1 * props.bads + props.goods)/(props.goods + props.bads + props.neutrals)} />
      <StatisticLine text="positive" value ={`${props.goods / (props.goods + props.bads + props.neutrals) * 100} %`} /> 
      </tbody>
    </table>
    )
    
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button
       handleClick={increaseGood}
       text="good"
       />
      <Button
       handleClick={increaseNeutral}
       text="neutral"
       />
      <Button
       handleClick={increaseBad}
       text="bad"
       />

      <h1>statistics</h1>
      <Statistics
      goods={good}
      bads={bad}
      neutrals={neutral}/>

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)