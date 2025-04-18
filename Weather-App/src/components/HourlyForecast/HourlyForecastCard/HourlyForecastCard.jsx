import { useState, useEffect } from 'react';
import { AnimatePresence, easeInOut, motion } from "motion/react";

import Skeleton from "react-loading-skeleton";

import 'react-loading-skeleton/dist/skeleton.css';
import styles from './hourly-forecast-card.module.css';
import globalStyles from '../../../styles/global.module.css';
export const HourlyForecastCard = ({ unit, currentHourObject }) => {
    const [isImageLoading, setIsImageLoading] = useState(true);

    useEffect(() => {
        setIsImageLoading(true);
    }, [currentHourObject]);

    const onLoadImageHandler = () => {
        // Flow: initial state (on component mount ): true -> when image is loaded onLoadHandler set state: false -> when day is clicked useEffect runs and set state -> true, when image is loaded onLoadHandler set state: false.
        // Slow down setting of isImageLoading state to false because loading-skeleton have to be displayed for minimum 0.3 seconds(while state is true).
        setTimeout(() => {
            setIsImageLoading(false);
        }, 500)

    }

    const time = currentHourObject.time.split(' ')[1];
    return (
        <div>
            <p>{time}</p>
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
                    style={{
                        // display none to prevent showing image before loading skeleton appears
                        display: isImageLoading ? 'none' : 'block'
                    }}
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
                    <img className={isImageLoading ? '' : ''} src={currentHourObject.condition.icon} alt="Weather img" key={currentHourObject.time_epoch} onLoad={onLoadImageHandler} />
                </motion.div>
            </div>
            <p>{unit === "C" ? `${currentHourObject.temp_c}° C` : `${currentHourObject.temp_f} °F`}</p>
        </div>
    )
}