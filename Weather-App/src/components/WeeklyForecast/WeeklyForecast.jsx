import { memo } from "react";
import { parseLocalTimePart } from "../../utils/formatLocalTime";

import styles from "./weekly-forecast.module.css";
export const WeeklyForecast = memo(({ forecastday, unit, changeHourlyForecastHandler }) => {
    return (
        <ul>
            {forecastday?.map((dailyWeatherData, index) => {
                return <li key={index}>
                    <div className={styles.cursorPointer} onClick={() => changeHourlyForecastHandler(index)}>
                        <p>{parseLocalTimePart(dailyWeatherData.date, { weekday: "short" })}</p>
                        <img src={dailyWeatherData.day.condition.icon} alt="Weather img" />
                        <p>{unit === "C" ? `${dailyWeatherData.day.avgtemp_c}° C` : `${dailyWeatherData.day.avgtemp_f} °F`}</p>
                    </div>
                </li>
            })
            }
        </ul >
    )
})