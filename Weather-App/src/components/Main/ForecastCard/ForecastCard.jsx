import { parseLocalTimePart } from "../../../utils/formatLocalTime"
import styles from "./forecast-card.module.css";
export const ForecastCard = ({
    unit,
    avgTempC,
    avgTempF,
    tempC,
    tempF,
    dateTime,
    icon,

}) => {
    const tempCelsius = avgTempC || tempC;
    const tempFahrenheit = avgTempF || tempF;

    // If dateTime is time we show hours but if prop is date it is formatting it from dd/mm/yyyy to name of a day of the week.
    const isDate = !isNaN(new Date(dateTime));
    const formattedDateTime = isDate ? parseLocalTimePart(dateTime, { weekday: "short" }) : dateTime
    return (
        <div>
            <p>{formattedDateTime}</p>
            <img src={icon} alt="Weather img" />
            <p>{unit === "C" ? `${tempCelsius}° C` : `${tempFahrenheit} °F`}</p>
        </div>
    )
}