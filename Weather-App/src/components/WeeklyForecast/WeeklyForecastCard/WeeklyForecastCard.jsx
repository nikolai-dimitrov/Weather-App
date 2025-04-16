import { useState, useEffect } from "react";

import Skeleton from "react-loading-skeleton";

import { parseLocalTimePart } from "../../../utils/formatLocalTime";

import 'react-loading-skeleton/dist/skeleton.css';
import styles from "./weekly-forecast-card.module.css";
import globalStyles from '../../../styles/global.module.css'

export const WeeklyForecastCard = ({ unit, dailyWeatherData, changeHourlyForecastHandler, index }) => {
    const [isImageLoading, setIsImageLoading] = useState(true);

    useEffect(() => {
        setIsImageLoading(true);
    }, [dailyWeatherData]);

    const onLoadImageHandler = () => {
        setIsImageLoading(false);
    }

    const shortDayName = parseLocalTimePart(dailyWeatherData.date, { weekday: "short" });

    return (
        <div className={styles.cursorPointer} onClick={() => changeHourlyForecastHandler(index)}>
            <p>{shortDayName}</p>
            {isImageLoading && <Skeleton className={globalStyles.imgSkeletonMedium} />}
            <img className={isImageLoading ? globalStyles.displayNone : ''} src={dailyWeatherData.day.condition.icon} alt="Weather img" onLoad={onLoadImageHandler} />
            <p>{unit === "C" ? `${dailyWeatherData.day.avgtemp_c}° C` : `${dailyWeatherData.day.avgtemp_f} °F`}</p>
        </div>
    )
}