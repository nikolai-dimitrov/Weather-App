import { HourlyForecastCard } from "./HourlyForecastCard/HourlyForecastCard";
export const HourlyForecastList = ({ filteredHours }) => {
    return (
        <ul>
            {filteredHours?.map((currentHourObject) => {
                const key = currentHourObject.time.split(' ')[1];
                return (
                    <HourlyForecastCard key={key} currentHourObject={currentHourObject} />
                )
            })
            }
        </ul >
    )
}