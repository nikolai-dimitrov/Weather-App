import { parseLocalTimePart } from "../../../utils/formatLocalTime";
import styles from "./weekly-forecast-card.module.css";
export const WeeklyForecastCard = ({ unit, dailyWeatherData, changeHourlyForecastHandler, index }) => {
    const shortDayName = parseLocalTimePart(dailyWeatherData.date, { weekday: "short" });
    return (
        <div className={styles.cursorPointer} onClick={() => changeHourlyForecastHandler(index)}>
            <p>{shortDayName}</p>
            <img src={dailyWeatherData.day.condition.icon} alt="Weather img" onLoad={() => console.log('img loaded')} />
            <p>{unit === "C" ? `${dailyWeatherData.day.avgtemp_c}° C` : `${dailyWeatherData.day.avgtemp_f} °F`}</p>
        </div>
    )
}