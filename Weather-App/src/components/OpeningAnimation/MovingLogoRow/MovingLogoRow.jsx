
import { IoMdPartlySunny } from "react-icons/io";
import styles from "./moving-logo-row.module.css";
export const MovingLogoRow = () => {
    return (
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
    )
}