function CardWeather({ data, unitSign, roundTemp, formatDate }) {

    return (
        <div className="card">
            <div className="d-flex justify-content-center align-items-center">
                <img
                    src={`${import.meta.env.VITE_ICON_URL}${data.weather[0].icon}@2x.png`}
                    alt={data.weather[0].description || "weather icon"}
                />
                <h4 className="card-title">{roundTemp(data.main.temp) + unitSign}</h4>
            </div>
            <div className="card-body">
                <p className="text-muted">{formatDate(data.dt_txt)}</p>
                <p className="card-text text-capitalize fs-4">
                    {data.weather[0].description}
                </p>
            </div>
        </div>
    )
}

export default CardWeather