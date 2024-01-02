import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryList = ({ countries, onShowCountry }) => {
    if (countries.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    } else if (countries.length === 1) {
        return (
            <CountryDetails country={countries[0]} />
        )
    } else {
        return (
            <ul>
                {countries.map(country => (
                    <li key={country.name.common}>
                        {country.name.common}
                        <button onClick={() => onShowCountry(country)}>show</button>
                    </li>))}
            </ul>
        )
    }
}

const CountryDetails = ({ country }) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        const api_key = import.meta.env.VITE_REACT_APP_API_KEY
        const capital = country.capital[0]
        const lat = country.capitalInfo.latlng[0]
        const lon = country.capitalInfo.latlng[1]

        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
            .then(response => {
                setWeather(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [country])

    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital[0]}</div>
            <div>population {country.population}</div>
            <div>area {country.area}</div>
            <h2>languages</h2>
            <ul>
                {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
            </ul>
            <img src={country.flags.png} alt="flag" />
            {weather && (
                <div>
                    <h2>Weather in {country.capital[0]}</h2>
                    <div><b>temperature:</b> {parseFloat(weather.main.temp - 273.15).toFixed(2)} Celsius</div>
                    {weather.weather && weather.weather[0] && (
                        <div>
                            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default CountryList
export { CountryDetails }