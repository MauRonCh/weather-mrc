import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import Loading from './components/Loading'
import WeatherCard from './components/WeatherCard'

function App() {
  
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()

  useEffect(() => {
    const success = pos => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }

    setCoords(obj)
  }
  const error = () => {
    alert('Error: Please confirm your ubication to check the weather')
  }
      navigator.geolocation.getCurrentPosition(success, error)
  }, [])


//

useEffect(() => {
  if (coords) {
    const APIKEY = '7b72674595e7623555d4ffa570c8e929';
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`;

    axios.get(URL)
      .then(res => {
        const celsius = (res.data.main.temp - 273.15).toFixed(1);
        const fahrenheit = (celsius * (9/5) + 32).toFixed(1);
        setWeather(res.data);
        setTemperature({celsius, fahrenheit});
      })
      .catch(err => console.log(err));
  }
}
, [coords]);


console.log(weather);


  return (
    <div className="app">
      <img className='backImg' src="https://cdn.pixabay.com/photo/2016/03/27/07/32/clouds-1282314_960_720.jpg" alt="a" />
      {
        weather ?
      <WeatherCard weather={weather} temperature={temperature}/>
        :
      <Loading />
    }
    </div>
  )
}

export default App
