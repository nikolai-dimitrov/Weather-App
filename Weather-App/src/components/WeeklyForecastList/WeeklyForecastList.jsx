import { memo } from "react";
import { WeeklyForecastCard } from "./WeeklyForecastCard/WeeklyForecastCard";

export const WeeklyForecastList = memo(({ forecastday, unit, changeHourlyForecastHandler, isLoading }) => {
    return (
        <ul>
            {forecastday?.map((dailyWeatherData, index) => {
                return (
                    <WeeklyForecastCard key={dailyWeatherData.date} unit={unit} dailyWeatherData={dailyWeatherData} changeHourlyForecastHandler={changeHourlyForecastHandler} index={index} isLoading={isLoading} />
                )
            })
            }
        </ul >
    )
})



    // useEffect(() => {
    //     console.log("different image cdn runs index:", index)
    //     console.log("state:",isImageLoading, index)

    //     // setIsImageLoading(true);
    //     timeoutRef.current = setTimeout(() => {
    //         setIsImageLoading(true)
    //         console.log('completed timeout', index)
    //     }, 300)

    //     return () => clearTimeout(timeoutRef.current)

    // }, [dailyWeatherData.day.condition.icon]);