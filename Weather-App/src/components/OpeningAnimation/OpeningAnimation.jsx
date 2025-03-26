import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
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
                    {/* <motion.div
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 0 }}
                        transition={{ delay: 3, duration: 0.5 }}
                        className={styles.overflowH}
                    >
                        <div className={styles.cloudsContainer}>
                            <IoMdPartlySunny size={35} />
                            <IoMdPartlySunny size={35} />
                            <IoMdPartlySunny size={35} />
                            <IoMdPartlySunny size={35} />
                        </div>
                    </motion.div> */}
                </motion.div>
            </div>
        </>
    )
}
