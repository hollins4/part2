import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

function App() {
    const [searchCountries, setSearchCountries] = useState([''])
    const [countries, setCountries] = useState([])
    const [ showCountry, setShowCountry] = useState([-1])

    const handleSearch = (event) => {
      setSearchCountries(event.target.value)
    }

    useEffect( () => {
        axios(`https://restcountries.com/v3.1/name/${searchCountries}`)
        .then(response => {
          setCountries(response.data)    
          setShowCountry(-1)
        })
    }, [searchCountries])
    
    const buttonHandler = (index) => {
      setShowCountry(index);
      console.log("show country", showCountry)
    }

    return (
      <div>
        <div>
          find coutnries: 
          <input 
            type='text' 
            value={searchCountries} 
            onChange={handleSearch}>
          </input>
          <div>
          <DisplayCountries countries={countries} buttonHandler={buttonHandler} showCountry={showCountry}/>
            
          </div>
        </div>
      </div>
    );
}

export default App;


const DisplayCountries = ({countries, buttonHandler, showCountry}) => {
  
  if (countries.length > 10)
    return <div>Too many matches, specify another filter</div>
  
  if (countries.length === 1) {
    let country = countries[countries.length - 1]
    return countryToShow(country)
  }

  return (
    countries.map( (country, index) => {

       return (
          <div>
            <span key={country.name.common}>{country.name.common}</span>             
            { showCountry === index ? 
                countryToShow(country) : 
                <button onClick={() => buttonHandler(index)}>Show</button> 
            }
          </div>
      )
    })
  )
}

const countryToShow = (country) => {

  return(
    <div>
      <h1>{country.name.common}</h1>
      <span>capital {country.capital} </span>
      <br />
      <span>population {country.population}</span>
      <h3>languages</h3>
      <ul>{
        Object.entries(country.languages).map( ([key, values]) => <li key={key}>{values}</li>)
      }
      </ul>
      <img src={country.flags.png} alt={country.flag} width='100' height='100'/>
    </div>
  )
}
