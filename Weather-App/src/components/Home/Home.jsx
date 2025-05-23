import { useState, useContext, useMemo, useRef, useCallback } from "react";
import { WeatherContext } from "../../contexts/WeatherContext";

import { WeeklyForecastList } from "../WeeklyForecastList/WeeklyForecastList";
import { HourlyForecastList } from "../HourlyForecast/HourlyForecastList";
import { Popup } from "../Popup/Popup";
import { FadeTransition } from "../FadeTransition/FadeTransition";
import Skeleton from "react-loading-skeleton";

import { useImageLoadingSkeleton } from "../../hooks/useImageLoadingSkeleton";
import { useScreenResize } from "../../hooks/useScreenResize";
import { formatLocalTime, parseLocalTimePart } from "../../utils/formatLocalTime";

import { AnimatePresence, easeInOut, motion, useInView } from "motion/react";
import { FaTemperatureFull, FaWind, FaTemperatureArrowDown, FaTemperatureArrowUp } from "react-icons/fa6";
import { IoWaterOutline } from "react-icons/io5";
import { FiSunrise, FiSunset } from "react-icons/fi";

import "react-loading-skeleton/dist/skeleton.css";
import styles from "./home.module.css";
import globalStyles from "../../styles/global.module.css"
export const Home = () => {
    const {
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
        icon
    } = useContext(WeatherContext);
    const [selectedDay, setSelectedDay] = useState(0);
    const { isImageLoading, onLoadImageHandler } = useImageLoadingSkeleton(isLoading);
    const isMobile = useScreenResize();
    const scrollContainerRef = useRef(null);
    const isInView = useInView(scrollContainerRef, { once: false });

    const formattedLocalTimeString = formatLocalTime(localtime);
    // It parses date to corresponding short day name. - Wed
    const dayName = parseLocalTimePart(forecastday?.[selectedDay].date, { weekday: "short" })

    const filteredHours = useMemo(() =>
        forecastday?.[selectedDay].hour?.filter((el, index) => [2, 8, 12, 18, 21].includes(index)), [forecastday, selectedDay]);

    const changeHourlyForecastHandler = useCallback((forecastDayIndex) => {
        setSelectedDay(forecastDayIndex);
    }, [forecastday]);

    return (
        <>
            <section>
                <AnimatePresence>
                    {error && <Popup message={error.message} clearError={clearError} />}
                </AnimatePresence>
                <div className={styles.homeContentContainer}>
                    <motion.div
                        key="home"
                        transition={{
                            duration: 0.3,
                            ease: easeInOut,
                        }}

                        initial={{
                            opacity: 0,
                        }}

                        animate={{ opacity: 1 }}

                    >
                        <div className={styles.todayWeatherContainer}>
                            <FadeTransition uniqueKey={name}>
                                {isLoading ? <Skeleton height={29} className={styles.subHeading}></Skeleton> : <h2 className={styles.subHeading}>{formattedLocalTimeString}</h2>}
                                {isLoading ? <Skeleton height={34} className={styles.heading} width={'70%'}></Skeleton> : <h1 className={styles.heading}>{name}, {country}</h1>}
                                {isLoading ? <Skeleton height={24} width={'50%'} className={styles.info} ></Skeleton> : <p className={styles.info}>{text}</p>}
                            </FadeTransition>
                            <div className={styles.weatherDescriptionContainer}>
                                <div className={styles.animationContainer}>
                                    <AnimatePresence>
                                        {

                                            (isImageLoading || isLoading) && (
                                                <motion.div
                                                    key="skeleton"
                                                    className={styles.skeletonContainer}
                                                    transition={{
                                                        duration: 0.3,
                                                        ease: easeInOut,
                                                    }}

                                                    initial={{
                                                        opacity: 1,

                                                    }}


                                                    exit={{
                                                        opacity: 0,
                                                    }}
                                                >
                                                    <Skeleton className={globalStyles.imgSkeletonLarge} />
                                                </motion.div>
                                            )

                                        }
                                    </AnimatePresence>
                                    <div className={styles.imageWrapper}>
                                        <motion.div
                                            key={name}
                                            transition={{
                                                duration: 0.3,
                                                delay: 0.2,
                                                ease: easeInOut,
                                            }}

                                            initial={{
                                                opacity: 0,
                                            }}

                                            animate={{
                                                // When isImageLoading is false skeleton disappears and animation starts.
                                                opacity: (isImageLoading || isLoading) ? 0 : [0, 0, 1, 1],

                                            }}
                                        >
                                            <img className={(isImageLoading || isLoading) ? globalStyles.visibilityHidden : ''} src={`${icon}?cacheBust=${Date.now()}`} alt="weather-img" onLoad={onLoadImageHandler} />
                                        </motion.div>
                                    </div>
                                </div>
                                <FadeTransition uniqueKey={name}>
                                    {isLoading ? <Skeleton height={49} width={124}></Skeleton> : <p className={styles.currentTemp}>{unit === "C" ? `${temp_c}° C` : `${temp_f} °F`}</p>}
                                </FadeTransition>
                                <FadeTransition uniqueKey={name}>
                                    {isLoading ? <div className={styles.todayDescriptionSkeletonContainer}><Skeleton height={20} width={153} count={3}></Skeleton></div> :
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
                                        </ul>}
                                </FadeTransition>

                            </div>
                            <FadeTransition uniqueKey={name}>
                                <ul className={styles.astrologyContainer}>
                                    <li>
                                        {isLoading ? <Skeleton height={17} width={140} ></Skeleton> :
                                            <>
                                                <FiSunrise />
                                                <p>Rise: <span>{sunrise}</span></p>
                                            </>
                                        }

                                    </li>
                                    <li>
                                        {isLoading ? <Skeleton height={17} width={140} ></Skeleton> :
                                            <>
                                                <FiSunset />
                                                <p>Set: <span>{sunset}</span></p>
                                            </>
                                        }
                                    </li>
                                    <li>
                                        {isLoading ? <Skeleton height={17} width={140} ></Skeleton> :
                                            <>
                                                <FaTemperatureArrowUp />
                                                <p>High: <span>{unit === "C" ? `${maxtemp_c}° C` : `${maxtemp_f}° F`}</span></p>
                                            </>
                                        }

                                    </li>
                                    <li>
                                        {isLoading ? <Skeleton height={17} width={140} ></Skeleton> :
                                            <>
                                                <FaTemperatureArrowDown />
                                                <p>Low: <span>{unit === "C" ? `${mintemp_c}° C` : `${mintemp_f}° F`}</span></p>
                                            </>
                                        }
                                    </li>
                                </ul>
                            </FadeTransition>

                        </div>
                        <div className={styles.forecastContainer}>
                            <h2>Three Days Forecast</h2>
                            <WeeklyForecastList forecastday={forecastday} changeHourlyForecastHandler={changeHourlyForecastHandler} />
                        </div>
                        <div className={styles.forecastContainer}>
                            <h2>Hourly Forecast - {dayName}</h2>
                            <div className={styles.hourlyForecastWrapper} ref={scrollContainerRef}>
                                <motion.div
                                    transition={{ duration: 2 }}

                                    animate={{
                                        x: (isInView && isMobile) ? [0, -50, 0] : {}
                                    }}
                                >
                                    <HourlyForecastList filteredHours={filteredHours} />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    )
}