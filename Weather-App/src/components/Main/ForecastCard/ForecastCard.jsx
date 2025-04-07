import styles from "./forecast-card.module.css";
export const ForecastCard = ({
    unit,
    date,
    day: {
        avgtemp_c,
        avgtemp_f,
        condition: {
            icon,
        }
    },

}) => {
    return (
        <div>
            <p>{date}</p>
            <img src={icon} alt="Weather img" />
            <p>{unit === "C" ? `${avgtemp_c}° C` : `${avgtemp_f} °F`}</p>
        </div>
    )
}