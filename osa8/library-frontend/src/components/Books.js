import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import GenreButtons from '../components/GenreButtons'
import Booklist from '../components/Booklist'

const Books = (props) => {
  const [genre, setGenre] = useState('')
  const result = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  console.log('BOOKS:', books)

  if(genre !== '') {
    const booksToShow = books.filter(b => b.genres.includes(genre))

    return (
      <div>
        <h2>books</h2>
        <p>in genre <b>{genre}</b></p>

        <Booklist books={booksToShow}/>

        <GenreButtons setGenre={setGenre}/>
      </div>
    )
  }

  return (
    <div>
      <h2>books</h2>

      <Booklist books={books}/>
      
      <GenreButtons setGenre={setGenre}/>
    </div>
  )
}

export default Books