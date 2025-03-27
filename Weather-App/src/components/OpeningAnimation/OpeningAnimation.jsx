import { useState, useEffect, useRef } from "react";
import { easeInOut, motion } from "motion/react";
import { Circle } from 'rc-progress';
import { IoMdPartlySunny } from "react-icons/io";

import styles from "./opening-animation.module.css"
export const OpeningAnimation = () => {
    const [currentPercent, setCurrentPercent] = useState(0);
    const percentRef = useRef(0)
    const maxPercentValue = 100;

    // TODO: RequestAnimationFrame
    useEffect(() => {
        const increasePercent = setInterval(() => {
            if (percentRef.current < maxPercentValue) {
                percentRef.current += 1;
                if (percentRef.current % 2 === 0) {
                    setCurrentPercent(percentRef.current)
                }
            } else {
                clearInterval(increasePercent)
            }
        }, 25)

        return () => clearInterval(increasePercent)
    }, [])
    return (
        <>
            <div className={styles.layout}>
                <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: 300 }}
                    transition={{ duration: 4, delay: 3, ease: "easeIn" }}
                    className={styles.animationContainer}
                >
                    <Circle
                        percent={currentPercent}
                        strokeWidth={3}
                        strokeColor="#fff"
                        trailColor="#abddff"
                        className={styles.circle}
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 4.2, times: [0, 0.4, 0.95, 1] }}
                    >
                        <div className={styles.logoContainer}>
                            <IoMdPartlySunny size={65} />
                            <span>WeatherNow</span>
                        </div>
                    </motion.div>
                    <div className={styles.movingAnimationContainer}>
                        <motion.div
                            animate={{ x: [0, 100, 0], opacity: [0, 0.6, 0.6, 0] }}
                           transition={{ duration: 3.75, repeat: Infinity, ease: easeInOut, times: [0, 0.9, 0.9, 1] }}
                            className={styles.cloudsContainer}
                        >
                            <div className={styles.movingLogoWrapper}>
                                <div className={styles.movingLogoContainer}>
                                    <IoMdPartlySunny size={35} />
                                    <span>WeatherNow</span>
                                </div>
                                <div className={styles.movingLogoContainer}>
                                    <IoMdPartlySunny size={35} />
                                    <span>WeatherNow</span>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            animate={{ x: [100, 0, 100], opacity: [0, 0.6, 0.6, 0] }}
                           transition={{ duration: 3.75, repeat: Infinity, ease: easeInOut, times: [0, 0.9, 0.9, 1] }}
                        >
                            <div className={styles.movingLogoWrapper}>
                                <div className={styles.movingLogoContainer}>
                                    <IoMdPartlySunny size={35} />
                                    <span>WeatherNow</span>
                                </div>
                                <div className={styles.movingLogoContainer}>
                                    <IoMdPartlySunny size={35} />
                                    <span>WeatherNow</span>
                                </div>
                                <div className={styles.movingLogoContainer}>
                                    <IoMdPartlySunny size={35} />
                                    <span>WeatherNow</span>
                                </div>
                                <div className={styles.movingLogoContainer}>
                                    <IoMdPartlySunny size={35} />
                                    <span>WeatherNow</span>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            animate={{ x: [0, 100, 0], opacity: [0, 0.6, 0.6, 0] }}
                           transition={{ duration: 3.75, repeat: Infinity, ease: easeInOut, times: [0, 0.9, 0.9, 1] }}
                            className={styles.cloudsContainer}
                        >
                            <div className={styles.movingLogoWrapper}>
                                <div className={styles.movingLogoContainer}>
                                    <IoMdPartlySunny size={35} />
                                    <span>WeatherNow</span>
                                </div>
                                <div className={styles.movingLogoContainer}>
                                    <IoMdPartlySunny size={35} />
                                    <span>WeatherNow</span>
                                </div>
                                <div className={styles.movingLogoContainer}>
                                    <IoMdPartlySunny size={35} />
                                    <span>WeatherNow</span>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            animate={{ x: [100, 0, 100], opacity: [0, 0.6, 0.6, 0] }}
                           transition={{ duration: 3.75, repeat: Infinity, ease: easeInOut, times: [0, 0.9, 0.9, 1] }}
                        >
                            <div className={styles.movingLogoWrapper}>
                                <div className={styles.movingLogoContainer}>
                                    <IoMdPartlySunny size={35} />
                                    <span>WeatherNow</span>
                                </div>
                                <div className={styles.movingLogoContainer}>
                                    <IoMdPartlySunny size={35} />
                                    <span>WeatherNow</span>
                                </div>
                                <div className={styles.movingLogoContainer}>
                                    <IoMdPartlySunny size={35} />
                                    <span>WeatherNow</span>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            animate={{ x: [0, 100, 0], opacity: [0, 0.6, 0.6, 0] }}
                           transition={{ duration: 3.75, repeat: Infinity, ease: easeInOut, times: [0, 0.9, 0.9, 1] }}
                            className={styles.cloudsContainer}
                        >
                            <div className={styles.movingLogoWrapper}>
                                <div className={styles.movingLogoContainer}>
                                    <IoMdPartlySunny size={35} />
                                    <span>WeatherNow</span>
                                </div>
                                <div className={styles.movingLogoContainer}>
                                    <IoMdPartlySunny size={35} />
                                    <span>WeatherNow</span>
                                </div>
                                <div className={styles.movingLogoContainer}>
                                    <IoMdPartlySunny size={35} />
                                    <span>WeatherNow</span>
                                </div>
                                <div className={styles.movingLogoContainer}>
                                    <IoMdPartlySunny size={35} />
                                    <span>WeatherNow</span>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            animate={{ x: [100, 0, 100], opacity: [0, 0.6, 0.6, 0] }}
                           transition={{ duration: 3.75, repeat: Infinity, ease: easeInOut, times: [0, 0.9, 0.9, 1] }}
                        >
                            <div className={styles.movingLogoWrapper}>
                                <div className={styles.movingLogoContainer}>
                                    <IoMdPartlySunny size={35} />
                                    <span>WeatherNow</span>
                                </div>
                                <div className={styles.movingLogoContainer}>
                                    <IoMdPartlySunny size={35} />
                                    <span>WeatherNow</span>
                                </div>
                                <div className={styles.movingLogoContainer}>
                                    <IoMdPartlySunny size={35} />
                                    <span>WeatherNow</span>
                                </div>
                                <div className={styles.movingLogoContainer}>
                                    <IoMdPartlySunny size={35} />
                                    <span>WeatherNow</span>
                                </div>
                                <div className={styles.movingLogoContainer}>
                                    <IoMdPartlySunny size={35} />
                                    <span>WeatherNow</span>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            animate={{ x: [0, 100, 0], opacity: [0, 0.6, 0.6, 0] }}
                           transition={{ duration: 3.75, repeat: Infinity, ease: easeInOut, times: [0, 0.9, 0.9, 1] }}
                            className={styles.cloudsContainer}
                        >
                            <div className={styles.movingLogoWrapper}>
                                <div className={styles.movingLogoContainer}>
                                    <IoMdPartlySunny size={35} />
                                    <span>WeatherNow</span>
                                </div>
                                <div className={styles.movingLogoContainer}>
                                    <IoMdPartlySunny size={35} />
                                    <span>WeatherNow</span>
                                </div>
                                <div className={styles.movingLogoContainer}>
                                    <IoMdPartlySunny size={35} />
                                    <span>WeatherNow</span>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            animate={{ x: [100, 0, 100], opacity: [0, 0.6, 0.6, 0] }}
                            transition={{ duration: 3.75, repeat: Infinity, ease: easeInOut, times: [0, 0.9, 0.9, 1] }}
                        >
                            <div className={styles.movingLogoWrapper}>
                                <div className={styles.movingLogoContainer}>
                                    <IoMdPartlySunny size={35} />
                                    <span>WeatherNow</span>
                                </div>
                                <div className={styles.movingLogoContainer}>
                                    <IoMdPartlySunny size={35} />
                                    <span>WeatherNow</span>
                                </div>
                                <div className={styles.movingLogoContainer}>
                                    <IoMdPartlySunny size={35} />
                                    <span>WeatherNow</span>
                                </div>

                            </div>
                        </motion.div>

                    </div>
                </motion.div>
            </div>
        </>
    )
}
