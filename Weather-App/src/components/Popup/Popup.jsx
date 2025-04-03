import { motion } from "motion/react";

import { FaCircleExclamation } from "react-icons/fa6";
import styles from "./popup.module.css";
export const Popup = ({ message, clearError }) => {
    return (
        <>
            <motion.div
                key={message}
                transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 800,
                    damping: 23,
                }}

                initial={{
                    x: "100vw",

                }}

                animate={{
                    x: "0vw",
                }}

                exit={{
                    x: "100vw",
                }}

                className={styles.popupContainer}
            >
                <div className={styles.messageWrapper}>
                    <FaCircleExclamation />
                    <p>{message}</p>
                </div>
                <button onClick={clearError}>X</button>
            </ motion.div>
        </>
    )
}