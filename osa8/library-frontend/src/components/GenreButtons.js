import React from 'react'

const GenreButtons = ({ setGenre }) => {
    return (
        <div>
        <button onClick={() => setGenre('love')}>love</button>
        <button onClick={() => setGenre('jes')}>jes</button>
        <button onClick={() => setGenre('')}>all genres</button>
        </div>
    )
}

export default GenreButtons