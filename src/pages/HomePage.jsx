import { useEffect, useState } from 'react'
import axios from 'axios'

function HomePage() {
    // State Variables
    const [erros, setErrors] = useState("");
    const [weatherData, setWeatherData] = useState({});
    const [currWeather, setCurrWeather] = useState({});

    // Daily Forecast
    const dailyForecast = weatherData.list && weatherData.list.length > 0 ? weatherData.list.filter(dailyForecast => dailyForecast.dt_txt.includes("12:00:00")) : [];

    // Temperature Rounded
    const roundTemp = (temp) => {
        return Math.round(parseInt(temp));
    }

    // Format Date
    const formatDate = (date) => {
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    }

    // Get Data at Component Mount
    useEffect(() => {
        getWeatherData();
    }, [])


    // Get Weather Data
    const getWeatherData = () => {
        axios.get(`${import.meta.env.VITE_API_URL}?q=Lodi,it&units=metric&appid=${import.meta.env.VITE_API_KEY}`)
            .then(resp => {
                console.log(resp.data, resp.data.list[0]);
                setWeatherData(resp.data);
                setCurrWeather(resp.data.list[0]);
            })
            .catch(error => {
                setErrors("Error fetching weather data. Please try again later.");
            })
    }

    return (
        <>
            {/* Page Title and Subtitle */}
            <h1 className="mt-5 text-center text-uppercase">Weather Forecast</h1>
            {weatherData.city && <p className="text-center">Here's your weather forecast for {weatherData.city.name}, {weatherData.city.country}.</p>}

            {/* Current Weather Data */}
            {currWeather && Object.keys(currWeather).length > 0 &&
                <section className='my-5'>
                    <h2 className='text-center mb-4'>Current weather</h2>
                    <div className="d-flex gap-5 justify-content-center align-items-end">
                        <div className="d-flex align-items-center">
                            <img src={`${import.meta.env.VITE_ICON_URL}${currWeather.weather[0].icon}@2x.png`} alt={`Icon ${currWeather.weather[0].description} weather`} />
                            <h3 style={{ fontSize: "50px" }}>{roundTemp(currWeather.main.temp)} °C</h3>
                        </div>
                        <div className='text-muted mx-5'>
                            <p className='mb-0'>Feels Like: {roundTemp(currWeather.main.feels_like)} °C</p>
                            <p className='mb-0'>Humidity: {currWeather.main.humidity}%</p>
                            <p>Wind: {roundTemp(currWeather.wind.speed)} Km/h</p>
                        </div>
                        <div className='text-end ms-5'>
                            <p className='mb-0'>{weatherData.city.name}, {weatherData.city.country}</p>
                            <p className='text-muted mb-1'>{formatDate(currWeather.dt_txt)}</p>
                            <p className='text-capitalize'>{currWeather.weather[0].description}</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <button className='btn btn-primary' onClick={() => getWeatherData()}>Update Weather</button>
                    </div>
                </section>
            }

            {/* Following 4-day Forecast */}
            {
                dailyForecast && dailyForecast.length > 0 &&
                <section className='text-center pt-5 mb-5'>
                    <h2>Next 4 days weather:</h2>
                    <div className="row mt-5">
                        {dailyForecast.slice(1).map((curDay, index) =>
                            <div className="col" key={index}>
                                <div className="card">
                                    <img src={`${import.meta.env.VITE_ICON_URL}${curDay.weather[0].icon}@2x.png`} className="card-img-top" alt={`Icon ${curDay.weather[0].description} weather`} />
                                    <div className="card-body">
                                        <p className="text-muted">{formatDate(curDay.dt_txt)}</p>
                                        <p>{roundTemp(curDay.main.temp)} °C</p>
                                        <p className="card-text text-capitalize">{curDay.weather[0].description}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            }
        </>
    )
}

export default HomePage