import { useState, useEffect, useMemo, useCallback } from "react";

import { WeeklyForecast } from "../WeeklyForecast/WeeklyForecast";
import { HourlyForecast } from "../HourlyForecast/HourlyForecast";
import { Popup } from "../Popup/Popup";
import { SkeletonLayout } from "../SkeletonLayout/SkeletonLayout";
import Skeleton from "react-loading-skeleton";

import { formatLocalTime, parseLocalTimePart } from "../../utils/formatLocalTime";

import { AnimatePresence, easeInOut, motion } from "motion/react";
import { FaTemperatureFull, FaWind, FaTemperatureArrowDown, FaTemperatureArrowUp } from "react-icons/fa6";
import { IoWaterOutline } from "react-icons/io5";
import { FiSunrise, FiSunset } from "react-icons/fi";

import 'react-loading-skeleton/dist/skeleton.css';
import styles from "./home.module.css";
import globalStyles from "../../styles/global.module.css"
export const Home = ({
    isLoading,
    error,
    clearError,
    unit,
    humidity,
    wind_kph,
    feelslike_c,
    feelslike_f,
    temp_c,
    temp_f,
    country,
    name,
    localtime,
    forecastday,
    text,
    sunrise,
    sunset,
    maxtemp_c,
    maxtemp_f,
    mintemp_c,
    mintemp_f,
    icon }) => {
    const [selectedDay, setSelectedDay] = useState(0);
    const [isImageLoading, setIsImageLoading] = useState(true);

    useEffect(() => {
        setIsImageLoading(true);
    }, [forecastday]);

    const formattedLocalTimeString = formatLocalTime(localtime);
    // It parses date to corresponding short day name. - Wed
    const dayName = parseLocalTimePart(forecastday?.[selectedDay].date, { weekday: "short" })

    const filteredHours = useMemo(() =>
        forecastday?.[selectedDay].hour?.filter((el, index) => [2, 8, 12, 18, 21].includes(index)), [forecastday, selectedDay]);

    const changeHourlyForecastHandler = useCallback((forecastDayIndex) => {
        setSelectedDay(forecastDayIndex);
    }, [forecastday]);

    const onLoadImageHandler = () => {
        setIsImageLoading(false);
    }

    return (
        <>
            <section>
                <AnimatePresence>
                    {error && <Popup message={error} clearError={clearError} />}
                </AnimatePresence>
                <AnimatePresence mode="wait">
                    {isLoading ? <SkeletonLayout unit={unit} /> :
                        <motion.div
                            key="home"
                            transition={{
                                duration: 0.3,
                                ease:easeInOut,
                            }}

                            initial={{
                                opacity: 0,
                            }}

                            animate={{
                                opacity: 1,
                            }}
                        >
                            <div className={styles.todayWeatherContainer}>
                                <h2 className={styles.subHeading}>{formattedLocalTimeString}</h2>
                                <h1 className={styles.heading}>{name}, {country}</h1>
                                <p>{text}</p>
                                <div className={styles.weatherDescriptionContainer}>
                                    {isImageLoading && <Skeleton className={globalStyles.imgSkeletonLarge} />}
                                    <img className={isImageLoading ? globalStyles.displayNone : ''} src={icon} alt="" onLoad={onLoadImageHandler} />
                                    <p>{unit === "C" ? `${temp_c}° C` : `${temp_f} °F`}</p>
                                    <ul>
                                        <li>
                                            <FaTemperatureFull />
                                            <p>
                                                Real fell: <span>{unit === "C" ? `${feelslike_c}° C` : `${feelslike_f}° F`}</span>
                                            </p>
                                        </li>
                                        <li>
                                            <IoWaterOutline />
                                            <p>
                                                Humidity:  <span>{humidity} %</span>
                                            </p>
                                        </li>
                                        <li>
                                            <FaWind />
                                            <p>
                                                Wind: <span>{wind_kph} km/h</span>
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <ul className={styles.astrologyContainer}>
                                    <li>
                                        <FiSunrise />
                                        <p>Rise: <span>{sunrise}</span></p>
                                    </li>
                                    <li>
                                        <FiSunset />
                                        <p>Set: <span>{sunset}</span></p>
                                    </li>
                                    <li>
                                        <FaTemperatureArrowUp />
                                        <p>High: <span>{unit === "C" ? `${maxtemp_c}° C` : `${maxtemp_f}° F`}</span></p>
                                    </li>
                                    <li>
                                        <FaTemperatureArrowDown />
                                        <p>Low: <span>{unit === "C" ? `${mintemp_c}° C` : `${mintemp_f}° F`}</span></p>
                                    </li>
                                </ul>
                            </div>
                            <div className={styles.forecastContainer}>
                                <h2>Three Days Forecast</h2>
                                <WeeklyForecast forecastday={forecastday} unit={unit} changeHourlyForecastHandler={changeHourlyForecastHandler} />
                            </div>
                            <div className={styles.forecastContainer}>
                                <h2>Hourly Forecast - {dayName}</h2>
                                <HourlyForecast filteredHours={filteredHours} unit={unit} />
                            </div>
                        </motion.div>
                    }
                </AnimatePresence>

            </section>
        </>
    )
}