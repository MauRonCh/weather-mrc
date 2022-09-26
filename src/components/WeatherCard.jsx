import React, { useState } from 'react'

const WeatherCart = ({ weather, temperature }) => {

    const [isCelsius, setIsCelsius] = useState(false);

    const changeTemp = () => setIsCelsius(!isCelsius);

    //first letter of a string with mayus
    function firstLetterMayus(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    //Applying in clouds description
    const clouds = firstLetterMayus(weather?.weather[0].description)

    return (
        <article className='card'>
            <h1 className='card__title'>Weather App</h1>
            <h2 className='card__subtitle'>{`${weather?.name}, ${weather?.sys.country}`}</h2>
            <h3 className='card__second__title'>-{clouds}-</h3>
            <section className='card__first'>
                <img className='card__first__img' src={weather && `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="Weather icon" />
            </section>
            <section className='card__second'>
                <ul className='card__second__list'>
                    <li className='card__second__item'><span className='card__second__span'><i className='bx bx-wind'></i> Wind speed: </span>{weather?.wind.speed} m/s</li>
                    <li className='card__second__item'><span className='card__second__span'><i className='bx bx-cloud'></i> Clouds: </span>{weather?.clouds.all}%</li>
                    <li className='card__second__item'><span className='card__second__span'><i className='bx bxs-thermometer' ></i> Pressure: </span>{weather?.main.pressure} hPa</li>
                    <li className='card__second__item'><span className='card__second__span'><i className='bx bx-droplet'></i> Humidity: </span>{weather?.main.humidity}%</li>
                </ul>
            </section>
            <h2 className='card__temp'>{isCelsius ? `${temperature?.celsius} °C` : `${temperature?.fahrenheit} °F`}</h2>
            <button className='card__btn' onClick={changeTemp}>{isCelsius ? 'Change to Fahrenheit' : 'Change to Celsius'}</button>
        </article>
    )
}

export default WeatherCart