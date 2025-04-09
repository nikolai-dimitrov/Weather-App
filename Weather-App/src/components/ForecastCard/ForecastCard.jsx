import { parseLocalTimePart } from "../../utils/formatLocalTime";
import styles from "./forecast-card.module.css";
export const ForecastCard = ({
    index,
    unit,
    avgTempC,
    avgTempF,
    tempC,
    tempF,
    dateTime,
    icon,
    changeHourlyForecastHandler,
    isClickable

}) => {
    const tempCelsius = avgTempC || tempC;
    const tempFahrenheit = avgTempF || tempF;

    // If dateTime is hour we show hour but if it is date then transform it from dd/mm/yyyy to name of a day of the week.
    const isDate = !isNaN(new Date(dateTime));
    const formattedDateTime = isDate ? parseLocalTimePart(dateTime, { weekday: "short" }) : dateTime;

    return (
        <div className={`${isClickable ? styles.cursorPointer : ''}`} onClick={isClickable ? () => changeHourlyForecastHandler(index) : undefined}>
            <p>{formattedDateTime}</p>
            <img src={icon} alt="Weather img" />
            <p>{unit === "C" ? `${tempCelsius}° C` : `${tempFahrenheit} °F`}</p>
        </div>
    )
}