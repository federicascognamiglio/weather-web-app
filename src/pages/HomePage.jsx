import { useEffect, useState } from 'react'
import axios from 'axios'

function HomePage() {
    // State Variables
    const [erros, setErrors] = useState("");
    const [weatherData, setWeatherData] = useState({});
    const [currWeather, setCurrWeather] = useState({});
    const [unit, setUnit] = useState("metric");

    // Variables
    const unitSign = unit === "metric" ? "°C" : "°F";

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

    // Get Weather Data
    const getWeatherData = () => {
        axios.get(`${import.meta.env.VITE_API_URL}?q=Lodi,it&units=${unit}&appid=${import.meta.env.VITE_API_KEY}`)
            .then(resp => {
                setWeatherData(resp.data);
                setCurrWeather(resp.data.list[0]);
            })
            .catch(error => {
                setErrors("Error fetching weather data. Please try again later.");
            })
    }

    // Switch Unit
    const switchUnit = () => {
        if (unit === "metric") {
            setUnit("imperial");
        } else {
            setUnit("metric");
        }
    }

    // Get Data at Component Mount and when unit changes
    useEffect(() => {
        getWeatherData();
    }, [unit])

    return (
        <>
            {/* Page Title and Subtitle */}
            <h1 className="mt-5 text-center text-uppercase">Weather Forecast</h1>
            {weatherData.city && <p className="text-center">Here's your weather forecast for {weatherData.city.name}, {weatherData.city.country}.</p>}

            {/* Current Weather Data */}
            {currWeather && Object.keys(currWeather).length > 0 &&
                <div className="container-sm">

                    <section className='my-5'>
                        <h2 className='text-center mb-4'>Current weather</h2>

                        <div className="row gx-2 gy-4 align-items-end">
                            {/* Column 1: Basic Info */}
                            <div className="col-12 col-md-4 d-flex align-items-center justify-content-center text-center">
                                <img src={`${import.meta.env.VITE_ICON_URL}${currWeather.weather[0].icon}@2x.png`}
                                    alt={`Icon ${currWeather.weather[0].description} weather`} />
                                <h3 style={{ fontSize: "50px" }}>{roundTemp(currWeather.main.temp) + unitSign}</h3>
                            </div>

                            {/* Column 2: Weather Details */}
                            <div className="col-12 col-md-4 d-flex justify-content-center">
                                <div className="text-center">
                                    <p className='mb-0'>Feels Like: {roundTemp(currWeather.main.feels_like) + unitSign}</p>
                                    <p className='mb-0'>Humidity: {currWeather.main.humidity}%</p>
                                    <p>Wind: {roundTemp(currWeather.wind.speed)} Km/h</p>
                                </div>
                            </div>

                            {/* Column 3: Date and Location Details */}
                            <div className="col-12 col-md-4 d-flex justify-content-center">
                                <div className="text-center text-md-end">
                                    <p className='mb-0'>{weatherData.city.name}, {weatherData.city.country}</p>
                                    <p className='text-muted mb-1'>{formatDate(currWeather.dt_txt)}</p>
                                    <p className='text-capitalize'>{currWeather.weather[0].description}</p>
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center mt-3 gap-3">
                            <button onClick={() => getWeatherData()} className='btn btn-primary'>Update Weather</button>
                            <button onClick={() => switchUnit()} className='btn btn-outline-primary'>
                                Switch to {unit === 'metric' ? "Fahrenheit" : "Celsius"}
                            </button>
                        </div>
                    </section>
                </div>
            }

            {/* Following 4-day Forecast */}
            {
                dailyForecast && dailyForecast.length > 0 &&
                <section className='text-center pt-5 mb-5'>
                    <h2>Next 4 days weather:</h2>
                    <div className="row mt-5">
                        {dailyForecast.slice(1).map((curDay, index) =>
                            <div className="col-12 col-md-6 col-lg-3 mb-4" key={index}>
                                <div className="card">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <img src={`${import.meta.env.VITE_ICON_URL}${curDay.weather[0].icon}@2x.png`} alt={`Icon ${curDay.weather[0].description} weather`} />
                                        <h4 className='card-title'>{roundTemp(curDay.main.temp) + unitSign}</h4>
                                    </div>
                                    <div className="card-body">
                                        <p className="text-muted">{formatDate(curDay.dt_txt)}</p>
                                        <p className="card-text text-capitalize fs-4">{curDay.weather[0].description}</p>
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