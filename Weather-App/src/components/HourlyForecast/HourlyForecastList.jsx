import { HourlyForecastCard } from "./HourlyForecastCard/HourlyForecastCard";
export const HourlyForecastList = ({ filteredHours, unit }) => {
    return (
        <ul>
            {filteredHours?.map((currentHourObject, index) => {
                return (
                    <li key={index}>
                        <HourlyForecastCard unit={unit} currentHourObject={currentHourObject} />
                    </li>
                )
            })
            }
        </ul >
    )
}