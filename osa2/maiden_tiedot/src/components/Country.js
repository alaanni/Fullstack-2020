import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Country = ({country}) => {
    const [weather, setWeather] = useState('')
    const url = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`
    useEffect(() => {
        console.log('effect')
        axios
          .get(url)
          .then(response => {
            console.log('promise fulfilled')
            setWeather(response.data.current)
            console.log(response.data.current)
          })
      }, [country, url])
      console.log('render weather')

    return (
    <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>
            {country.languages.map(language => 
                <li key={language.iso639_2}>{language.name}</li>)}
        </ul>
        <img src={country.flag} alt={`${country.name} flag`} width={'15%'} height={'15%'}/>
        <h2>Weather in {country.capital}</h2>
        <p>
            <b>temperature: </b> {weather ? weather.temperature : null} Celcius
        </p>
        <img src={weather.weather_icons} alt={country.capital, 'weather'}/>
        <p>
            <b>wind: </b> {weather.wind_speed} mph direction {weather.wind_dir}
        </p>
        
    </div>
    )
}

export default Country