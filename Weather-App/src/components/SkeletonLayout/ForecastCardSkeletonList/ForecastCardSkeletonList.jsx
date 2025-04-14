import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export const ForecastCardSkeletonList = ({ cardsCount, unit }) => {
    return (
        <>
            <ul>
                {[...Array(cardsCount)].map((_, index) => {
                    return <li key={index}>
                        <div>
                            <p><Skeleton width={40} /></p>
                            <Skeleton width={70} height={45} />
                            <p><Skeleton width={40} /> {unit === "C" ? `°C` : `°F`}</p>
                        </div>
                    </li>
                })
                }
            </ul >
        </>
    )
}