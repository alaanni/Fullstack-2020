import React, { useState } from 'react'
import Select from 'react-select'
import { EDIT_BIRTHYEAR } from '../queries'
import { useMutation } from '@apollo/client'

const BirthyearForm = ({ authors, token }) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const [editBirthyear] = useMutation(EDIT_BIRTHYEAR)

    const bornIsNull = authors.filter(a => a.born === null)
    console.log(bornIsNull)
    const names = bornIsNull.map(a => { return { value: a.name, label: a.name } })
    console.log(names)

    const submit = async (event) => {
      console.log(born, name)
      event.preventDefault()

      editBirthyear({ variables: { name: name.value, born } })
      
      setName('')
      setBorn('')
    }

    if (!token) {
      return null
      }

    return (
      <div>
        <h2>Set birthyear</h2>

        <form onSubmit={submit}>
            <div>
            name
            <Select 
              value={name} 
              onChange={(selectedName) => setName(selectedName)}
              options={names}         
            />
            </div>
            <div>
            born
            <input
                value={born}
                onChange={({ target }) => setBorn(parseInt(target.value))}
            />
            </div>
            <button type='submit'>update author</button>
        </form>
      </div>
    )
}

export default BirthyearForm