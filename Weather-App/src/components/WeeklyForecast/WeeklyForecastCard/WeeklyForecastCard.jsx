import { useState, useEffect } from "react";
import { AnimatePresence, motion, easeInOut } from "motion/react";
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
            <div className={styles.animationContainer}>
                <AnimatePresence>
                    {
                        isImageLoading && (
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
                <motion.div
                    key="image"
                    transition={{
                        duration: 0.3,
                        delay: 0.2,
                        ease: easeInOut,
                    }}

                    initial={{
                        opacity: 0,
                    }}

                    animate={{
                        // Ternary operator because image will mount in the same time with skeleton and animation will run under the skeleton.Target is to start animation when skeleton disappear.
                        // When isImageLoading is false skeleton disappears and animation starts.
                        opacity: isImageLoading ? 0 : 1,

                    }}
                >
                    <img src={dailyWeatherData.day.condition.icon} alt="Weather img" onLoad={onLoadImageHandler} />

                </motion.div>
            </div>
            <p>{unit === "C" ? `${dailyWeatherData.day.avgtemp_c}° C` : `${dailyWeatherData.day.avgtemp_f} °F`}</p>
        </div>
    )
}