import React from 'react'

const Filter = (props) => {
    const handleFilterChange = (event) => {
        console.log('Filter: ', event.target.value)
        props.setNewFilter(event.target.value)
    }


return (
      <div>filter shown with <input value={props.newFilter} 
      onChange={handleFilterChange}/></div>
)
}

export default Filter