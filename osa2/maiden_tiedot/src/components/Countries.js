
import React, { useState } from 'react'
import Button from './Button'
import Country from './Country'

const Countries = ({countries}) => {
    const [selectedCountry, setSelectedCountry] = useState('')

    const handleClick = (country) => () => {
        setSelectedCountry(country)
        console.log('Button clicked')
    }

    return (
        <div>
            {countries.map (country =>
                <p key={country.alpha3Code}>
                {country.name} <Button onClick={handleClick(country)} 
                text={'show'}/>
                </p>   
            )}
        {selectedCountry ? <Country country={selectedCountry} /> : null}
        </div>
    )
}

export default Countries