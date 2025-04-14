import { ForecastCardSkeletonList } from "./ForecastCardSkeletonList/ForecastCardSkeletonList";
import Skeleton from "react-loading-skeleton";


import { FaTemperatureFull, FaWind, FaTemperatureArrowDown, FaTemperatureArrowUp } from "react-icons/fa6";
import { IoWaterOutline } from "react-icons/io5";
import { FiSunrise, FiSunset } from "react-icons/fi";


import styles from "../Home/home.module.css";
import skeletonStyles from "./skeleton-layout.module.css";
import 'react-loading-skeleton/dist/skeleton.css';


export const SkeletonLayout = ({ unit }) => {
    return (
        <>
            <div className={styles.todayWeatherContainer}>
                <h2 className={styles.subHeading}>{<Skeleton className={skeletonStyles.skeletonSecondaryHeading} />}</h2>
                <h1 className={styles.heading}><Skeleton className={skeletonStyles.skeletonPrimaryHeading} /></h1>
                <p><Skeleton className={skeletonStyles.skeletonSubHeading} /></p>
                <div className={styles.weatherDescriptionContainer}>
                    {<Skeleton className={skeletonStyles.skeletonMainDescription} />}
                    <p>{<Skeleton className={skeletonStyles.skeletonMainDescription} />} {unit === "C" ? `°C` : `°F`}</p>
                    <ul>
                        <li>
                            <FaTemperatureFull />
                            <p>
                                Real fell: <span><Skeleton className={skeletonStyles.mainSkeleton} /> {unit === "C" ? `°C` : `°F`}</span>
                            </p>
                        </li>
                        <li>
                            <IoWaterOutline />
                            <p>
                                Humidity:  <span>{<Skeleton className={skeletonStyles.mainSkeleton} />}%</span>
                            </p>
                        </li>
                        <li>
                            <FaWind />
                            <p>
                                Wind: <span>{<Skeleton className={skeletonStyles.mainSkeleton} />}km/h</span>
                            </p>
                        </li>
                    </ul>
                </div>
                <ul className={styles.astrologyContainer}>
                    <li>
                        <FiSunrise />
                        <p>Rise: <span>{<Skeleton className={skeletonStyles.mainSkeleton} />}</span></p>
                    </li>
                    <li>
                        <FiSunset />
                        <p>Set: <span>{<Skeleton className={skeletonStyles.mainSkeleton} />}</span></p>
                    </li>
                    <li>
                        <FaTemperatureArrowUp />
                        <p>High: <span> <Skeleton className={skeletonStyles.mainSkeleton} /> {unit === "C" ? `°C` : `°F`}</span></p>
                    </li>
                    <li>
                        <FaTemperatureArrowDown />
                        <p>Low: <span><Skeleton className={skeletonStyles.mainSkeleton} /> {unit === "C" ? `°C` : `°F`}</span></p>
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
        </>
    )
}