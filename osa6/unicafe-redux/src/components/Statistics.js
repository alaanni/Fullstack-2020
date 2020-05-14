import React from 'react'

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

export default Statistics