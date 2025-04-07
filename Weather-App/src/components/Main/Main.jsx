import { Popup } from "../Popup/Popup";

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
    region,
    name,
    formattedLocaltime,
    text,
    threeDaysForecast,
    sunrise,
    sunset,
    maxtemp_c,
    maxtemp_f,
    mintemp_c,
    mintemp_f,
    icon }) => {
    return (
        <>
            <section>
                <AnimatePresence>
                    {error && <Popup message={error} clearError={clearError} />}
                </AnimatePresence>
                <div className={styles.todayWeatherContainer}>
                    <h2 className={styles.subHeading}>{formattedLocaltime}</h2>
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
            </section>
        </>
    )
}