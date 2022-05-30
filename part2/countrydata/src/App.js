import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Country = (props) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    console.log('effect')
    console.log({api_key})
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${props.country.capital}&appid=${api_key}`)
      .then((response) => {
        console.log('promise fulfilled')
        setWeather(response.data);
      });
  }, []);

 // REACT_APP_API_KEY=542f9c33733a0e52c9f8d72203af8167 npm start
  console.log({weather})
  return (
    <div>
      <h1>{props.country.name.common}</h1> 
      <div>
        capital {props.country.capital}
        <br></br>
        area {props.country.area}
      </div>
      <h3>languages:</h3>
      <ul>
        {Object.values(props.country.languages).map(language => 
          <li key={language}>
            {language}
          </li>
        )}
      </ul>
      <img src={props.country.flags.png}></img>
      <h2>Weather in {props.country.capital}</h2>
      {weather.weather ? (
        <div>
          <p>temperature {weather.main.temp} Celsius</p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
          <p> wind {weather.wind.speed} m/s </p>
        </div>
      ) : null}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState("")
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const filterCountries = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
    console.log({countries})
    setFilteredCountries (
      countries.filter(
        (country) =>
          country.name.common.toLowerCase().includes(event.target.value.toLowerCase()) 
      )
    )
  }

  const showCountries = () => {
    return (
      filteredCountries.length > 10
      ? <p>Too many matches, specify another filter</p>
      : (filteredCountries.length === 1)
        ? <Country country={filteredCountries[0]}/>
        : filteredCountries.map(country => 
             <p key={country.name.common}>
               {country.name.common} <button onClick={() => setFilteredCountries([country])}>show</button>
             </p>
           )    
    )
  }

  return (
    <div>
      <p>
        find countries <input value={newFilter} onChange={filterCountries} />
      </p>
      <div>
        {showCountries()}
      </div>
    </div>
  );

}

export default App