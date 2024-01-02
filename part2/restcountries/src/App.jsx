import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList, {CountryDetails} from './components/Countries'

const App = () => {
  const [searchCountry, setSearchCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = searchCountry
    ? countries.filter(country =>
      country.name.common.toLowerCase().includes(searchCountry.toLowerCase()))
    : []

  const handleSearchChange = (event) => {
    setSelectedCountry(null)
    setSearchCountry(event.target.value)
  }

  const handleShowCountry = (country) => {
    setSelectedCountry(country)
  }

  return (
    <div>
      find countries <input
        value={searchCountry}
        onChange={handleSearchChange} />
      {selectedCountry
        ? <CountryDetails country={selectedCountry} />
        : <CountryList countries={countriesToShow} onShowCountry={handleShowCountry} />
      }
    </div>
  )
}

export default App
