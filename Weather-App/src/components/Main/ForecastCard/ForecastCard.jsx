import styles from "./forecast-card.module.css";
export const ForecastCard = ({
    unit,
    avgTempC,
    avgTempF,
    tempC,
    tempF,
    date,
    time,
    icon

}) => {
    const tempCelsius = avgTempC || tempC;
    const tempFahrenheit = avgTempF || tempF;
    const dateTime = date || time;
    return (
        <div>
            <p>{dateTime}</p>
            <img src={icon} alt="Weather img" />
            <p>{unit === "C" ? `${tempCelsius}° C` : `${tempFahrenheit} °F`}</p>
        </div>
    )
}