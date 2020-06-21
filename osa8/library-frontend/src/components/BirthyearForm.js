import React, { useState } from 'react'
import { EDIT_BIRTHYEAR } from '../queries'
import { useMutation } from '@apollo/client'

const BirthyearForm = ({authors}) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const [changeBirthyear] = useMutation(EDIT_BIRTHYEAR)

    const bornIsNull = authors.filter(a => a.born === null)

    const submit = async (event) => {
      event.preventDefault()
      changeBirthyear({ variables: { name, born } })
      
      setName('')
      setBorn('')
    }

    return (
      <div>
        <h2>Set birthyear</h2>

        <form onSubmit={submit}>
            <div>
            name
            <select value={name} onChange={({ target }) => setName(target.value)}>
              {bornIsNull.map(a => <option key={a.name} value={a.name}>{a.name}</option>)}         
            </select>
            </div>
            <div>
            born
            <input
                value={born}
                onChange={({ target }) => setBorn(target.value)}
            />
            </div>
            <button type='submit'>update author</button>
        </form>
      </div>
    )
}

export default BirthyearForm