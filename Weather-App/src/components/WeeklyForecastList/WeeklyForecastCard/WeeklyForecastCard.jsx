import { useContext } from "react";
import { WeatherContext } from "../../../contexts/WeatherContext";
import { AnimatePresence, motion, easeInOut } from "motion/react";
import { FadeTransition } from "../../FadeTransition/FadeTransition";
import Skeleton from "react-loading-skeleton";

import { useImageLoadingSkeleton } from "../../../hooks/useImageLoadingSkeleton";

import { parseLocalTimePart } from "../../../utils/formatLocalTime";

import 'react-loading-skeleton/dist/skeleton.css';
import styles from "./weekly-forecast-card.module.css";
import globalStyles from '../../../styles/global.module.css'

export const WeeklyForecastCard = ({ dailyWeatherData, index, changeHourlyForecastHandler }) => {
    const { name, isLoading, unit} = useContext(WeatherContext);
    const { isImageLoading, onLoadImageHandler } = useImageLoadingSkeleton(isLoading);

    const shortDayName = parseLocalTimePart(dailyWeatherData.date, { weekday: "short" });
    return (
        <li>
            <div className={styles.cursorPointer} onClick={() => changeHourlyForecastHandler(index)}>
                {isLoading ?
                    <Skeleton height={20}></Skeleton> :
                    <p>{shortDayName}</p>
                }
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
                                    <Skeleton className={globalStyles.imgSkeletonMedium} />
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
                            {/* Change image visibility instantly when isLoading state is set to true. 
                        That prevents last image to be shown for a moment before skeleton appears. */}
                            <img className={(isImageLoading || isLoading) ? globalStyles.visibilityHidden : ''} src={`${dailyWeatherData.day.condition.icon}?cacheBust=${Date.now()}`} alt="Weather img" onLoad={onLoadImageHandler} />

                        </motion.div>
                    </div>
                </div>
                <FadeTransition uniqueKey={name}>
                    {isLoading ?
                        <Skeleton height={20}></Skeleton> :
                        <p>{unit === "C" ? `${dailyWeatherData.day.avgtemp_c}° C` : `${dailyWeatherData.day.avgtemp_f} °F`}</p>
                    }
                </FadeTransition>

            </div>
        </li>
    )
}