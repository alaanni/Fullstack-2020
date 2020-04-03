import React from 'react'
import personService from '../services/personService'

const PersonForm = ({persons, setPersons, newName, 
    setNewName, newNumber, setNewNumber, setMessage, setError}) => {
    const addPerson = (event) => {
        event.preventDefault()
        console.log('App, addPerson..')
        const personObject = {
            name: newName,
            number: newNumber
        }
        const findPerson = 
            persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
            console.log('findPerson result: ',
            persons.find(person => person.name === newName))

        if(findPerson !== undefined) {
            window.alert(`${newName} is already added to phonebook, replace the old
            number with a new one?`)

            personService
                .update(findPerson.id, personObject)
                .then(returnedPerson => {
                    setPersons(persons.map(person => 
                        person.id !== findPerson.id ? person : returnedPerson))
                    setMessage(
                        `Updated ${findPerson.name}'s number`
                    )
                })
                .catch(error => {
                    setError(true)
                    setMessage(`${findPerson.name} was already deleted from server`)
                })
            setTimeout(() => {
                setMessage(null)
            }, 4000)
        }

        else {
            personService
                .addPerson(personObject)
                .then(personObject => {
                    setPersons(persons.concat(personObject))
                    setNewName('')
                    setNewNumber('')
                          
                })
            setTimeout(() => {
                setMessage(null)
            }, 4000)         
        }
      }
    
    const handlePersonChange = (event) => {
        console.log('Name:', event.target.value)
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        console.log('Number:', event.target.value)
        setNewNumber(event.target.value)
    }

    return (

    <form onSubmit={addPerson}>
        <div>
            name: <input value={newName} onChange={handlePersonChange}/>
        </div>
        <div>
            number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
    )
}

export default PersonForm