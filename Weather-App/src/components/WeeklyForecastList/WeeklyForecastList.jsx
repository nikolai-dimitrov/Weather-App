import { memo } from "react";
import { WeeklyForecastCard } from "./WeeklyForecastCard/WeeklyForecastCard";

export const WeeklyForecastList = memo(({ forecastday, changeHourlyForecastHandler }) => {
    return (
        <ul>
            {forecastday?.map((dailyWeatherData, index) => {
                return (
                    <WeeklyForecastCard key={dailyWeatherData.date} dailyWeatherData={dailyWeatherData} index={index} changeHourlyForecastHandler={changeHourlyForecastHandler} />
                )
            })
            }
        </ul >
    )
})