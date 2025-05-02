import { useEffect, useContext, useRef } from 'react';
import { WeatherContext } from '../../../contexts/WeatherContext';

import { FadeTransition } from '../../FadeTransition/FadeTransition';
import { AnimatePresence, easeInOut, motion } from 'motion/react';
import Skeleton from "react-loading-skeleton";

import { useImageLoadingSkeleton } from '../../../hooks/useImageLoadingSkeleton';

import 'react-loading-skeleton/dist/skeleton.css';
import styles from './hourly-forecast-card.module.css';
import globalStyles from '../../../styles/global.module.css';
export const HourlyForecastCard = ({ currentHourObject }) => {
    const { name, isLoading, unit } = useContext(WeatherContext);
    const { isImageLoading, triggerImageLoading, onLoadImageHandler } = useImageLoadingSkeleton(isLoading);
    const previousCityNameRef = useRef(null);
    const imageSkeletonDelayRef = useRef(null);

    useEffect(() => {
        // It doesn't trigger on api call and takes care of the image skeleton when we change the hourly forecast only by clicking on the selected day in three day forecast.
        if (previousCityNameRef.current !== name) {
            previousCityNameRef.current = name;
            return;
        }

        imageSkeletonDelayRef.current = setTimeout(() => {
            triggerImageLoading()
        }, 300);


        return () => {
            clearTimeout(imageSkeletonDelayRef.current);
        }

    }, [currentHourObject]);

    const time = currentHourObject.time.split(' ')[1];

    return (
        <li>
            <div>
                {isLoading ?
                    <Skeleton height={20} width={64}></Skeleton> :
                    <p>{time}</p>
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
                        key={`${name}-${currentHourObject.pressure_mb}-${currentHourObject.temp_c}-${currentHourObject.dewpoint_f}`}
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
                        <img className={(isImageLoading || isLoading) ? globalStyles.visibilityHidden : ''} src={`${currentHourObject.condition.icon}?cacheBust=${Date.now()}`} alt="Weather img" onLoad={() => onLoadImageHandler(imageSkeletonDelayRef)} />
                    </motion.div>
                </div>
                <FadeTransition uniqueKey={`${name}-${currentHourObject.pressure_mb}-${currentHourObject.temp_c}-${currentHourObject.dewpoint_f}`}>
                    {isLoading ?
                        <Skeleton height={20} ></Skeleton> :
                        <p>{unit === "C" ? `${currentHourObject.temp_c}° C` : `${currentHourObject.temp_f} °F`}</p>
                    }
                </FadeTransition>
            </div>
        </li>
    )
}