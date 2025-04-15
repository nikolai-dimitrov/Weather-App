export const HourlyForecastCard = ({ unit, currentHourObject }) => {
    const time = currentHourObject.time.split(' ')[1];

    return (
        <div>
            <p>{time}</p>
            <img src={currentHourObject.condition.icon} alt="Weather img" />
            <p>{unit === "C" ? `${currentHourObject.temp_c}° C` : `${currentHourObject.temp_f} °F`}</p>
        </div>
    )
}