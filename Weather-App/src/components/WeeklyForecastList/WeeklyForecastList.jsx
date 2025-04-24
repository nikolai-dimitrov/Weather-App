import { memo } from "react";
import { WeeklyForecastCard } from "./WeeklyForecastCard/WeeklyForecastCard";

export const WeeklyForecastList = memo(({ forecastday, unit, changeHourlyForecastHandler, isLoading, name }) => {
    return (
        <ul>
            {forecastday?.map((dailyWeatherData, index) => {
                return (
                    <WeeklyForecastCard key={dailyWeatherData.date} unit={unit} dailyWeatherData={dailyWeatherData} changeHourlyForecastHandler={changeHourlyForecastHandler} index={index} isLoading={isLoading} name={name} />
                )
            })
            }
        </ul >
    )
})