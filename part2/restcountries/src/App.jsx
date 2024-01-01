import { useState, useEffect } from 'react'
import axios from 'axios'
import { Countries, Country } from './components/Countries'

const App = () => {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleChange = (event) => {
    setCountry(event.target.value)
  }

  const countriesToShow = country
    ? countries.filter(count => count.name.common.toLowerCase().includes(country.toLowerCase()))
    : []

  if (countriesToShow.length === 1) {
    return (
      <div>
        <div>
          find countries <input
            id='input-country'
            value={country}
            onChange={handleChange} />
        </div>
        <div>
          <Country country={countriesToShow[0]} />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div>
        find countries <input
          id='input-country'
          value={country}
          onChange={handleChange} />
      </div>
      <div>
        <Countries countries={countriesToShow} />
      </div>
    </div>

  )
}

export default App
