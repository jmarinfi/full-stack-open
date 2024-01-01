const urlBase = 'https://restcountries.eu/rest/v2/name/'

const Country = ({ country }) => {
    return (
        <>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <div>area {country.area}</div>
            <h2>languages</h2>
            <ul>
                {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
            </ul>
            <div>{country.flag}</div>
        </>
    )
}

const CountryShort = ({ country }) => {
    return (
        <div>
            {country.name.common}
            <button>show</button>
        </div>
    )
}

const Countries = ({ countries }) => {
    return (
        <>
            {countries.map(country => <CountryShort key={country.name.common} country={country} />)}
        </>
    )
}

export { Countries, Country }