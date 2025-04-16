import { HourlyForecastCard } from "./HourlyForecastCard/HourlyForecastCard";
export const HourlyForecast = ({ filteredHours, unit }) => {
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

// key={Date.now()