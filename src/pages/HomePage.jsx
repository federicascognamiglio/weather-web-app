import { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage() {
    // State Variables
    const [errors, setErrors] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [currWeather, setCurrWeather] = useState(null);
    const [unit, setUnit] = useState("metric");

    // Variables
    const unitSign = unit === "metric" ? "°C" : "°F";

    // HELPERS FUNCTION
    /**
     * Rounds temperature to the nearest integer
     *
     * @param {number} temp The temperature value to round
     * @returns {number} Rounded temperature
    */
    const roundTemp = (temp) => Math.round(temp);


    /**
     * Formats a date string into a short, human-readable format (e.g., "Wed, Jun 18").
     *
     * @param {string | number | Date} date - The date to format. Can be a date string, timestamp, or Date object.
     * @returns {string} A formatted date string using the 'en-US' locale.
    */
    const formatDate = (date) => {
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    };

    // Function to fetch weather data
    const getWeatherData = async () => {
        try {
            const resp = await axios.get(
                `${import.meta.env.VITE_API_URL}?q=Lodi,it&units=${unit}&appid=${import.meta.env.VITE_API_KEY}`
            );
            setWeatherData(resp.data);
            setCurrWeather(resp.data.list[0]);
            setErrors("");
        } catch (error) {
            setErrors("Error fetching weather data. Please try again later.");
        }
    };

    // Function to switch between metric and imperial units
    const switchUnit = () => setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));

    // UseEffect to fetch weather data on component mount and when unit changes
    useEffect(() => {
        getWeatherData();
    }, [unit]);

    // Filter daily forecast data for 12:00 PM entries
    const dailyForecast = weatherData?.list?.filter((item) => item.dt_txt.includes("12:00:00")) || [];

    return (
        <main>
            {/* Errors Alert */}
            {errors && <div className="alert alert-danger text-center w-50 mx-auto mt-5">{errors}</div>}

            {/* Title and Description */}
            <h1 className="mt-5 text-center text-uppercase">Weather Forecast</h1>
            {weatherData?.city && (
                <p className="text-center">
                    Here's your weather forecast for {weatherData.city.name}, {weatherData.city.country}.
                </p>
            )}

            {/* Weather Data Render */}
            {currWeather?.weather && (
                <div className="container-sm">
                    {/* Current weather Section */}
                    <section className="my-5">
                        <h2 className="text-center mb-4">Current weather</h2>
                        <div className="row gx-2 gy-4 align-items-end">

                            {/* Column 1 */}
                            <div className="col-12 col-md-4 d-flex align-items-center justify-content-center text-center">
                                <img
                                    src={`${import.meta.env.VITE_ICON_URL}${currWeather.weather[0].icon}@2x.png`}
                                    alt={currWeather.weather[0].description || "weather icon"}
                                />
                                <h3 style={{ fontSize: "50px" }}>{roundTemp(currWeather.main.temp) + unitSign}</h3>
                            </div>

                            {/* Column 2 */}
                            <div className="col-12 col-md-4 d-flex justify-content-center">
                                <div className="text-center">
                                    <p className="mb-0">Feels Like: {roundTemp(currWeather.main.feels_like) + unitSign}</p>
                                    <p className="mb-0">Humidity: {currWeather.main.humidity}%</p>
                                    <p>Wind: {roundTemp(currWeather.wind.speed)} Km/h</p>
                                </div>
                            </div>

                            {/* Column 3 */}
                            <div className="col-12 col-md-4 d-flex justify-content-center">
                                <div className="text-center text-md-end">
                                    <p className="mb-0">
                                        {weatherData.city.name}, {weatherData.city.country}
                                    </p>
                                    <p className="text-muted mb-1">{formatDate(currWeather.dt_txt)}</p>
                                    <p className="text-capitalize">{currWeather.weather[0].description}</p>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Buttons */}
                        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center mt-3 gap-3">
                            <button onClick={getWeatherData} className="btn btn-primary">
                                Update Weather
                            </button>
                            <button onClick={switchUnit} className="btn btn-outline-primary">
                                Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
                            </button>
                        </div>
                    </section>
                </div>
            )}

            {/* Daily Forecast Section */}
            {dailyForecast.length > 1 && (
                <section className="text-center pt-5 mb-5">
                    <h2>Next 4 days weather:</h2>
                    <div className="row mt-5">
                        {/* Cards render */}
                        {dailyForecast.slice(1).map((curDay) => (
                            <div className="col-12 col-md-6 col-lg-3 mb-4" key={curDay.dt}>
                                <div className="card">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <img
                                            src={`${import.meta.env.VITE_ICON_URL}${curDay.weather[0].icon}@2x.png`}
                                            alt={curDay.weather[0].description || "weather icon"}
                                        />
                                        <h4 className="card-title">{roundTemp(curDay.main.temp) + unitSign}</h4>
                                    </div>
                                    <div className="card-body">
                                        <p className="text-muted">{formatDate(curDay.dt_txt)}</p>
                                        <p className="card-text text-capitalize fs-4">{curDay.weather[0].description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}

export default HomePage;