import { useEffect, useState } from 'react';
import axios from 'axios';

// Components
import ErrorAlert from '../components/ErrorAlert';
import CurrentWeather from '../components/CurrentWeather';
import DailyForecast from '../components/DailyForecast';

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
            <ErrorAlert message={errors} />

            {/* Title and Description */}
            <h1 className="mt-5 text-center text-uppercase">Weather Forecast</h1>
            {weatherData?.city && (
                <p className="text-center">
                    Here's your weather forecast for {weatherData.city.name}, {weatherData.city.country}.
                </p>
            )}

            {/* Weather Data Render */}
            {currWeather?.weather && (
                <>
                    <CurrentWeather
                        currWeather={currWeather}
                        city={weatherData.city}
                        unitSign={unitSign}
                        roundTemp={roundTemp}
                        formatDate={formatDate}
                        onRefresh={getWeatherData}
                        onSwitchUnit={switchUnit}
                        unit={unit}
                    />
                    <DailyForecast
                        dailyForecast={dailyForecast}
                        unitSign={unitSign}
                        roundTemp={roundTemp}
                        formatDate={formatDate}
                    />
                </>
            )}
        </main>
    );
}

export default HomePage;