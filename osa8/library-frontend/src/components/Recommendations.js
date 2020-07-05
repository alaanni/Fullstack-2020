import React from 'react'
import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'
import Booklist from '../components/Booklist'

const Recommendations = (props) => {
    const { loading, error, data } = useQuery(ME)
    const bookResult = useQuery(ALL_BOOKS)

    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    const usersGenre = data.me.favoriteGenre
    console.log('usersGenre:', usersGenre)

    const books = bookResult.data.allBooks
    console.log('books:', books)

    const booksToShow = books.filter(b => b.genres.includes(usersGenre))
    
    if (!props.show) {
        return null
    }

    return (
        <div>
            <h2>recommendations</h2>
            <p>books in your favorite genre <b>{data.me.favoriteGenre}</b></p>
 
            <Booklist books={booksToShow}/>
        </div>
    )
}

export default Recommendations