
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useQuery, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })
  const client = useApolloClient()

  if (result.loading)  {
    return <div>loading...</div>
  }

  console.log(result.data.allAuthors)

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if(!token) {
    return (
      <div>
        <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
        </div>

      <Authors
        show={page === 'authors'}
        authors={result.data.allAuthors}
        token={token}
      />

      <Books
        show={page === 'books'}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
      />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={logout}>log out</button>
      </div>

      <Authors
        show={page === 'authors'}
        authors={result.data.allAuthors}
        token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App