
function CurrentWeather({ currWeather, city, unitSign, roundTemp, formatDate, onRefresh, onSwitchUnit, unit }) {

    return (
        <section className="my-5">
            <h2 className="text-center mb-4">Current weather</h2>
            <div className="row gx-2 gy-4 align-items-end">
                {/* Column 1 */}
                <div className="col-12 col-md-4 d-flex align-items-center justify-content-center text-center">
                    <img
                        src={`${import.meta.env.VITE_ICON_URL}${currWeather.weather[0].icon}@2x.png`}
                        alt={currWeather.weather[0].description || "weather icon"}
                    />
                    <h3 style={{ fontSize: "50px" }}>
                        {roundTemp(currWeather.main.temp) + unitSign}
                    </h3>
                </div>

                {/* Column 2 */}
                <div className="col-12 col-md-4 d-flex justify-content-center">
                    <div className="text-center">
                        <p className="mb-0">
                            Feels Like: {roundTemp(currWeather.main.feels_like) + unitSign}
                        </p>
                        <p className="mb-0">Humidity: {currWeather.main.humidity}%</p>
                        <p>Wind: {roundTemp(currWeather.wind.speed)} Km/h</p>
                    </div>
                </div>

                {/* Column 3 */}
                <div className="col-12 col-md-4 d-flex justify-content-center">
                    <div className="text-center text-md-end">
                        <p className="mb-0">
                            {city.name}, {city.country}
                        </p>
                        <p className="text-muted mb-1">{formatDate(currWeather.dt_txt)}</p>
                        <p className="text-capitalize">{currWeather.weather[0].description}</p>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center mt-3 gap-3">
                <button onClick={onRefresh} className="btn btn-primary">
                    Update Weather
                </button>
                <button onClick={onSwitchUnit} className="btn btn-outline-primary">
                    Switch to {unit === "metric" ? "Fahrenheit" : "Celsius"}
                </button>
            </div>
        </section>
    );
}

export default CurrentWeather