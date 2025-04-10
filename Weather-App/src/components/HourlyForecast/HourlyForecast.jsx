
export const HourlyForecast = ({ filteredHours, unit }) => {
    return (
        <ul>
            {filteredHours?.map((currentHourObject, index) => {
                return <li key={index}>
                    <div>
                        <p>{currentHourObject.time.split(' ')[1]}</p>
                        <img src={currentHourObject.condition.icon} alt="Weather img" />
                        <p>{unit === "C" ? `${currentHourObject.temp_c}° C` : `${currentHourObject.temp_c} °F`}</p>
                    </div>
                </li>
            })
            }
        </ul >
    )
}