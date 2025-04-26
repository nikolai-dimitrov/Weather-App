import { useState, useEffect } from "react";
import { AnimatePresence, motion, easeInOut } from "motion/react";
import Skeleton from "react-loading-skeleton";

import { parseLocalTimePart } from "../../../utils/formatLocalTime";

import 'react-loading-skeleton/dist/skeleton.css';
import styles from "./weekly-forecast-card.module.css";
import globalStyles from '../../../styles/global.module.css'

export const WeeklyForecastCard = ({ unit, dailyWeatherData, changeHourlyForecastHandler, index, isLoading }) => {
    const [isImageLoading, setIsImageLoading] = useState(true);

    useEffect(() => {
        // Because of react batching isLoading state won't change to true and it won't trigger useEffect and skeleton won't blink when internet is fast.
        // When internet is slow isLoading state will go true first than false and useEffect will trigger then skeleton will be shown.
        // In this case timeout with minimum ms delay before setIsImageLoading to prevent blinking isn't needed.
        setIsImageLoading(true);
    }, [isLoading]);



    const onLoadImageHandler = (e) => {
        setIsImageLoading(false);
    }

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
                            // When isImageLoading is false skeleton disappears and animation starts.
                            opacity: isImageLoading ? 0 : 1,
                        }}
                    >
                        {/* Change image visibility instantly when isLoading state is set to true. 
                        That prevents last image to be shown for a moment before skeleton appears. */}
                        <img className={(isLoading || isImageLoading) ? globalStyles.visibilityHidden : ''} src={`${dailyWeatherData.day.condition.icon}?cacheBust=${Date.now()}`} alt="Weather img" onLoad={onLoadImageHandler} />

                    </motion.div>
                </div>
                {isLoading ?
                    <Skeleton height={20}></Skeleton> :
                    <p>{unit === "C" ? `${dailyWeatherData.day.avgtemp_c}° C` : `${dailyWeatherData.day.avgtemp_f} °F`}</p>
                }
            </div>
        </li>
    )
}