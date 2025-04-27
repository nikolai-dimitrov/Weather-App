import { HourlyForecastCard } from "./HourlyForecastCard/HourlyForecastCard";
export const HourlyForecastList = ({ filteredHours, unit, isLoading, name}) => {
    return (
        <ul>
            {filteredHours?.map((currentHourObject) => {
                const key = currentHourObject.time.split(' ')[1];
                return (
                    <HourlyForecastCard key={key} unit={unit} currentHourObject={currentHourObject} isLoading={isLoading} name={name}  />
                )
            })
            }
        </ul >
    )
}