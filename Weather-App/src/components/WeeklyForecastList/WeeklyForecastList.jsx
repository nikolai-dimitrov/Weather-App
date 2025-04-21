import { memo} from "react";
import { WeeklyForecastCard } from "./WeeklyForecastCard/WeeklyForecastCard";

export const WeeklyForecastList = memo(({ forecastday, unit, changeHourlyForecastHandler }) => {
    return (
        <ul>
            {forecastday?.map((dailyWeatherData, index) => {
                return (
                    <WeeklyForecastCard key={dailyWeatherData.date} unit={unit} dailyWeatherData={dailyWeatherData} changeHourlyForecastHandler={changeHourlyForecastHandler} index={index} />
                )
            })
            }
        </ul >
    )
})