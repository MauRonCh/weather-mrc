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
          const fahrenheit = (celsius * (9 / 5) + 32).toFixed(1);
          setWeather(res.data);
          setTemperature({ celsius, fahrenheit });
        })
        .catch(err => console.log(err));
    }
  }
    , [coords]);

  console.log(weather)
  // thunder https://images.pexels.com/photos/53459/lightning-storm-weather-sky-53459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
  // cloud https://cdn.pixabay.com/photo/2016/03/27/07/32/clouds-1282314_960_720.jpg
  // sun https://images.pexels.com/photos/912364/pexels-photo-912364.jpeg
  // rain https://images.pexels.com/photos/325676/pexels-photo-325676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
  // mist https://static.vecteezy.com/system/resources/previews/003/643/444/original/cloudy-sky-background-with-clouds-or-fog-free-vector.jpg
  // snow https://media.istockphoto.com/vectors/idyllic-snowy-winter-landscape-vector-id1184566012?k=20&m=1184566012&s=612x612&w=0&h=t8iQ5JiiBoUdl75bojQrtMTAlZ1DMv8KFWx5cw4MCHo=

  //change background 
  let backImage = ''

  if (weather?.weather[0].id >= 801) {
    backImage = 'https://cdn.pixabay.com/photo/2016/03/27/07/32/clouds-1282314_960_720.jpg'
  }
  else if (weather?.weather[0].id == 800) {
    backImage = 'https://images.pexels.com/photos/912364/pexels-photo-912364.jpeg'
  }
  else if (weather?.weather[0].id >= 701) {
    backImage = 'https://static.vecteezy.com/system/resources/previews/003/643/444/original/cloudy-sky-background-with-clouds-or-fog-free-vector.jpg'
  }
  else if (weather?.weather[0].id >= 600) {
    backImage = 'https://media.istockphoto.com/vectors/idyllic-snowy-winter-landscape-vector-id1184566012?k=20&m=1184566012&s=612x612&w=0&h=t8iQ5JiiBoUdl75bojQrtMTAlZ1DMv8KFWx5cw4MCHo='
  }
  else if (weather?.weather[0].id >= 300) {
    backImage = 'https://images.pexels.com/photos/325676/pexels-photo-325676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
  else if (weather?.weather[0].id >= 200) {
    backImage = 'https://images.pexels.com/photos/53459/lightning-storm-weather-sky-53459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }

  return (
    <div className="app">
      <img className='backImg' src={backImage} alt="a" />
      {
        weather ?
          <WeatherCard weather={weather} temperature={temperature} />
          :
          <Loading />
      }
    </div>
  )
}

export default App
