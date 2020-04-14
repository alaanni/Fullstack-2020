import React from 'react'
import personService from '../services/personService'

const Persons = ({persons, setPersons, newFilter, setMessage, setError}) => {
    const personsToShow = persons.filter(person => 
        person.name.toLowerCase().includes(newFilter.toLowerCase()))

    const handleClick = (id, name) => () => {
        if (window.confirm(`delete ${name}?`)) {
        personService
            .deletePerson(id)
            .catch(error => {
                setError(true)
                setMessage(`${name} was already deleted from server`)
            })
        setError(false)
        setMessage(
            `Deleted ${name}`
        )
        setTimeout(() => {
            setMessage(null)
        }, 4000)

        setPersons(persons.filter(person => 
            person.id !== id))  
        }
    }
    
    return (
        <div>
        {personsToShow.map(person => 
          <div key={person.name}>
              {person.name} {person.number} <button onClick={handleClick(person.id, person.name)}>delete</button>
          </div>
          )}
    </div>
    )
}

export default Persons