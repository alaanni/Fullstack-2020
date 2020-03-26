import React from 'react'

const PersonForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {
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
          window.alert(`${newName} is already added to phonebook`)
        }
   
        else {
          setPersons(persons.concat(personObject))   
        }
        setNewName('')
        setNewNumber('')
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