import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'
import Country from './components/Country'

const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const filterCountries = () => {
    const filteredCountries = countries.filter((country) => 
      country.name.toLowerCase().includes(newFilter.toLowerCase()))
      return (
        filteredCountries
      )
  }

 const countriesToShow = filterCountries()


  console.log ('Näytettäviä maita kpl:', countriesToShow.length)
  console.log('Näytettävät maat:', countriesToShow)
  console.log('Tietoa maasta: ', countriesToShow[0])

  return (
    <div>
      <Filter value={newFilter} onChange={handleFilterChange}/>
      {newFilter.length === 0 ?
        <p></p> :
        countriesToShow.length > 0 ?
        countriesToShow.length === 1 ?
          <Country country={countriesToShow[0]}/> :
          countriesToShow.length > 10 ?
            <p>Too many matches, spesify another filter</p> :
            <Countries countries={countriesToShow}/> :
      <p>No matches found</p>
      }
    </div>
  )
}

export default App;
