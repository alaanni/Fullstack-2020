import React from 'react'

const Persons = ({persons, newFilter}) => {
    const personsToShow = persons.filter(person => 
        person.name.toLowerCase().includes(newFilter))
    
    return (
        <div>
        {personsToShow.map(person => 
          <div key={person.name}>
              {person.name} {person.number}
          </div>
          )}
    </div>
    )
}

export default Persons