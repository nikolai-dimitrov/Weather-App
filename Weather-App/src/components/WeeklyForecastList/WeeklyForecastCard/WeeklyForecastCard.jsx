import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, easeInOut } from "motion/react";
import Skeleton from "react-loading-skeleton";

import { parseLocalTimePart } from "../../../utils/formatLocalTime";

import 'react-loading-skeleton/dist/skeleton.css';
import styles from "./weekly-forecast-card.module.css";
import globalStyles from '../../../styles/global.module.css'

export const WeeklyForecastCard = ({ unit, dailyWeatherData, changeHourlyForecastHandler, index, isLoading }) => {
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [showImageSkeleton, setShowImageSkeleton] = useState(true);
    const imageSkeletonTimeoutRef = useRef(null);

    useEffect(() => {
        setIsImageLoading(true);
        imageSkeletonTimeoutRef.current = setTimeout(() => {
            if (isLoading || isImageLoading) {
                // if data isn't loaded for less than 100ms - show loading skeleton
                setShowImageSkeleton(true);
            }
        }, 100)

        return () => clearTimeout(imageSkeletonTimeoutRef.current);

    }, [isLoading]);

    useEffect(() => {
        // remove skeleton after data and image were loaded
        if (!isLoading && !isImageLoading) {
            setShowImageSkeleton(false);
        };
        
    }, [isLoading, isImageLoading]);

    const onLoadImageHandler = (e) => {
        // clearingTimeout prevents skeleton blinking when data loads fast.
        clearTimeout(imageSkeletonTimeoutRef.current)
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
                            showImageSkeleton && (
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
                            delay: 0.3,
                            ease: easeInOut,
                        }}

                        initial={{
                            opacity: 0,
                        }}

                        animate={{
                            // trigger animation when image is already loaded 
                            opacity: isImageLoading ? 0 : 1,
                        }}
                    >
                        {/* Change image visibility instantly when isImageLoading state is set to true. 
                        That prevents last image to be shown for a moment before skeleton appears. */}
                        <img className={isImageLoading ? globalStyles.visibilityHidden : ''} src={dailyWeatherData.day.condition.icon} key={dailyWeatherData.day.avgtemp_f} alt="Weather img" onLoad={onLoadImageHandler} />

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