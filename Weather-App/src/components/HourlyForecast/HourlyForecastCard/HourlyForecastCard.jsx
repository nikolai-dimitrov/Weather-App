import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, easeInOut, motion } from "motion/react";

import Skeleton from "react-loading-skeleton";

import 'react-loading-skeleton/dist/skeleton.css';
import styles from './hourly-forecast-card.module.css';
import globalStyles from '../../../styles/global.module.css';
export const HourlyForecastCard = ({ unit, currentHourObject, isLoading }) => {
    const [isImageLoading, setIsImageLoading] = useState(true);
    const imageSkeletonDelayRef = useRef(null);

    useEffect(() => {
        setIsImageLoading(true);
    }, [isLoading]);

    useEffect(() => {
        imageSkeletonDelayRef.current = setTimeout(() => {
            setIsImageLoading(true);
        }, 300);

        return () => {
            clearTimeout(imageSkeletonDelayRef.current);
        }

    }, [currentHourObject]);

    const onLoadImageHandler = (e) => {
        clearTimeout(imageSkeletonDelayRef.current);
        setIsImageLoading(false);

    }

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
                        <img className={(isLoading || isImageLoading) ? globalStyles.visibilityHidden : ''} src={`${currentHourObject.condition.icon}?cacheBust=${Date.now()}`}  alt="Weather img" onLoad={onLoadImageHandler} />
                    </motion.div>
                </div>
                {isLoading ?
                    <Skeleton height={20} ></Skeleton> :
                    <p>{unit === "C" ? `${currentHourObject.temp_c}° C` : `${currentHourObject.temp_f} °F`}</p>
                }

            </div>
        </li>
    )
}