import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/personService'
import Notification from './components/Notification'


const App = () => {
  console.log('App starts..')
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(getPersons => {
        setPersons(getPersons)
      })
  }, [])

  console.log('render', persons.length, 'persons')  

  return (   
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />

      <h2>add a new</h2>

      <PersonForm persons={persons} setPersons={setPersons} 
        newName={newName} setNewName={setNewName} 
        newNumber={newNumber} setNewNumber={setNewNumber}
        setMessage={setMessage} setError={setError}/>

      <h2>Numbers</h2>

      <Persons persons={persons} setPersons={setPersons} 
      newFilter={newFilter} setMessage={setMessage} setError={setError}/>
    </div>
  )
}

export default App