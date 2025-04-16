import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

import globalStyles from "../../../styles/global.module.css"
export const ForecastCardSkeletonList = ({ cardsCount, unit }) => {
    return (
        <>
            <ul>
                {[...Array(cardsCount)].map((_, index) => {
                    return <li key={index}>
                        <div>
                            <p><Skeleton className={globalStyles.textSkeletonMedium } /></p>
                            <Skeleton className={globalStyles.imgSkeletonMedium }  />
                            <p><Skeleton className={globalStyles.textSkeletonMedium }  /> {unit === "C" ? `°C` : `°F`}</p>
                        </div>
                    </li>
                })
                }
            </ul >
        </>
    )
}