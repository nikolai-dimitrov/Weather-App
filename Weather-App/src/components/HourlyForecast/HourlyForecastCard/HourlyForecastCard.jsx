import { useState, useEffect } from 'react';
import Skeleton from "react-loading-skeleton";

import 'react-loading-skeleton/dist/skeleton.css';

import globalStyles from '../../../styles/global.module.css'
export const HourlyForecastCard = ({ unit, currentHourObject }) => {
    const [isImageLoading, setIsImageLoading] = useState(true);

    useEffect(() => {
        setIsImageLoading(true);
    }, [currentHourObject]);

    const onLoadImageHandler = () => {
        setIsImageLoading(false);
    }

    const time = currentHourObject.time.split(' ')[1];
    return (
        <div>
            <p>{time}</p>
            {isImageLoading && <Skeleton className={globalStyles.imgSkeletonMedium} />}
            <img className={isImageLoading ? globalStyles.displayNone : ''} src={currentHourObject.condition.icon} alt="Weather img" key={currentHourObject.time_epoch} onLoad={onLoadImageHandler} />
            <p>{unit === "C" ? `${currentHourObject.temp_c}° C` : `${currentHourObject.temp_f} °F`}</p>
        </div>
    )
}