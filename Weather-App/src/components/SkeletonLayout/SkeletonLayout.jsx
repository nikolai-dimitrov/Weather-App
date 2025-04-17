import { ForecastCardSkeletonList } from "./ForecastCardSkeletonList/ForecastCardSkeletonList";
import { easeInOut, motion } from "motion/react";
import Skeleton from "react-loading-skeleton";


import { FaTemperatureFull, FaWind, FaTemperatureArrowDown, FaTemperatureArrowUp } from "react-icons/fa6";
import { IoWaterOutline } from "react-icons/io5";
import { FiSunrise, FiSunset } from "react-icons/fi";


import styles from "../Home/home.module.css";
import globalStyles from "../../styles/global.module.css"
import skeletonStyles from "./skeleton-layout.module.css";
import 'react-loading-skeleton/dist/skeleton.css';


export const SkeletonLayout = ({ unit }) => {
    return (
        <>
            <motion.div
                key="skeleton-layout"
                transition={{
                    duration: 0.3,
                    ease:easeInOut,
                }}

                initial={{
                    opacity: 0,

                }}

                animate={{
                    opacity: 1,
                }}

                exit={{
                    opacity: 0,
                }}
            >
                <div className={styles.todayWeatherContainer}>
                    <h2 className={styles.subHeading}>{<Skeleton className={skeletonStyles.skeletonSecondaryHeading} />}</h2>
                    <h1 className={styles.heading}><Skeleton className={skeletonStyles.skeletonPrimaryHeading} /></h1>
                    <p><Skeleton className={skeletonStyles.skeletonSubHeading} /></p>
                    <div className={styles.weatherDescriptionContainer}>
                        {<Skeleton className={globalStyles.imgSkeletonLarge} />}
                        <p>{<Skeleton className={skeletonStyles.skeletonWeatherText} />} {unit === "C" ? `°C` : `°F`}</p>
                        <ul>
                            <li>
                                <FaTemperatureFull />
                                <p>
                                    Real fell: <span><Skeleton className={globalStyles.textSkeletonMedium} /> {unit === "C" ? `°C` : `°F`}</span>
                                </p>
                            </li>
                            <li>
                                <IoWaterOutline />
                                <p>
                                    Humidity:  <span>{<Skeleton className={globalStyles.textSkeletonMedium} />}%</span>
                                </p>
                            </li>
                            <li>
                                <FaWind />
                                <p>
                                    Wind: <span>{<Skeleton className={globalStyles.textSkeletonMedium} />}km/h</span>
                                </p>
                            </li>
                        </ul>
                    </div>
                    <ul className={styles.astrologyContainer}>
                        <li>
                            <FiSunrise />
                            <p>Rise: <span>{<Skeleton className={globalStyles.textSkeletonMedium} />}</span></p>
                        </li>
                        <li>
                            <FiSunset />
                            <p>Set: <span>{<Skeleton className={globalStyles.textSkeletonMedium} />}</span></p>
                        </li>
                        <li>
                            <FaTemperatureArrowUp />
                            <p>High: <span> <Skeleton className={globalStyles.textSkeletonMedium} /> {unit === "C" ? `°C` : `°F`}</span></p>
                        </li>
                        <li>
                            <FaTemperatureArrowDown />
                            <p>Low: <span><Skeleton className={globalStyles.textSkeletonMedium} /> {unit === "C" ? `°C` : `°F`}</span></p>
                        </li>
                    </ul>
                </div>
                <div className={styles.forecastContainer}>
                    <h2>Three Days Forecast</h2>
                    <ForecastCardSkeletonList cardsCount={3} unit={unit} />
                </div>
                <div className={styles.forecastContainer}>
                    <h2>Hourly Forecast - <Skeleton width={40} /></h2>
                    <ForecastCardSkeletonList cardsCount={5} unit={unit} />

                </div>
            </motion.div>
        </>
    )
}