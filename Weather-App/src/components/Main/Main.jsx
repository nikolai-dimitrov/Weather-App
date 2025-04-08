import { ForecastCard } from "./ForecastCard/ForecastCard";
import { Popup } from "../Popup/Popup";
import { parseLocalTimePart, formatLocalTime } from "../../utils/formatLocalTime";

import { AnimatePresence } from "motion/react";
import { FaTemperatureFull, FaWind, FaTemperatureArrowDown, FaTemperatureArrowUp } from "react-icons/fa6";
import { IoWaterOutline } from "react-icons/io5";
import { FiSunrise, FiSunset } from "react-icons/fi";




import styles from "./main.module.css";
export const Main = ({ error,
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
    const formattedLocalTimeString = formatLocalTime(localtime);
    const filteredHours = forecastday[0]?.hour?.filter((el, index) => [2, 8, 12, 18, 21].includes(index));
    return (
        <>
            <section>
                <AnimatePresence>
                    {error && <Popup message={error} clearError={clearError} />}
                </AnimatePresence>
                <div className={styles.todayWeatherContainer}>
                    <h2 className={styles.subHeading}>{formattedLocalTimeString}</h2>
                    <h1 className={styles.heading}>{name}, {country}</h1>
                    <p>{text}</p>
                    <div className={styles.weatherDescriptionContainer}>
                        <img src={icon} alt="" />
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
                                    Humidity:  <span>{humidity}%</span>
                                </p>
                            </li>
                            <li>
                                <FaWind />
                                <p>
                                    Wind: <span>{wind_kph}km/h</span>
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
                <div className={styles.weeklyForecastContainer}>
                    <h2>Three Days Forecast</h2>
                    <ul>
                        {forecastday?.map((dailyWeatherData, index) =>
                            <li key={index}>
                                <ForecastCard
                                    unit={unit}
                                    dateTime={dailyWeatherData.date}
                                    icon={dailyWeatherData.day.condition.icon}
                                    avgTempC={dailyWeatherData.day.avgtemp_c}
                                    avgTempF={dailyWeatherData.day.avgtemp_f}
                                />
                            </li>
                        )}
                    </ul>
                </div>
                <div className={styles.weeklyForecastContainer}>
                    <h2>Hourly Forecast</h2>
                    <ul>
                        {filteredHours?.map((currentHour, index) =>
                            <li key={index}>
                                <ForecastCard
                                    unit={unit}
                                    icon={currentHour.condition.icon}
                                    dateTime={currentHour.time.split(' ')[1]}
                                    tempC={currentHour.temp_c}
                                    tempF={currentHour.temp_f}
                                />
                            </li>
                        )}
                    </ul>
                </div>
            </section>
        </>
    )
}