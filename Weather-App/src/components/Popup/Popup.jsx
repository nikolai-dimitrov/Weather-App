import { FaCircleExclamation } from "react-icons/fa6";
import styles from "./popup.module.css";
export const Popup = ({ message, clearError }) => {
    return (
        <>
            <div className={styles.popupContainer}>
                <div className={styles.messageWrapper}>
                    <FaCircleExclamation />
                    <p>{message}</p>
                </div>
                <button onClick={clearError}>X</button>
            </div>
        </>
    )
}