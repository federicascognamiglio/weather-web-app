// Components
import CardWeather from './CardWeather';

function DailyForecast({ dailyForecast, unitSign, roundTemp, formatDate }) {
    if (dailyForecast.length <= 1) return null;

    return (
        <section className="text-center pt-5 mb-5">
            <h2>Next 4 days weather:</h2>
            <div className="row mt-5">
                {/* Render Cards */}
                {dailyForecast.slice(1).map((curDay) => (
                    <div className="col-12 col-md-6 col-lg-3 mb-4" key={curDay.dt}>
                        <CardWeather
                            data={curDay}
                            unitSign={unitSign}
                            roundTemp={roundTemp}
                            formatDate={formatDate}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
export default DailyForecast