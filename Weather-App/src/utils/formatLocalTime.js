// Local time comes from api in the following format: 2025-04-03 16:53
const parseLocalTimePart = (localtime, options) => {
	const dateAsName = Intl.DateTimeFormat("en-US", options).format(
		new Date(localtime)
	);
	return dateAsName;
};

export const formatLocalTime = (localtime) => {
	const dateArray = localtime.split(" ")[0].split("-");
	const [year, , day] = dateArray;

	const dayName = parseLocalTimePart(localtime, { weekday: "long" });
	const monthName = parseLocalTimePart(localtime, { month: "short" });
	const formattedTime = parseLocalTimePart(localtime, {
		hour12: true,
		hour: "numeric",
		minute: "numeric",
	});

	const formattedLocalTime = `${dayName}, ${day} ${monthName} ${year} | Local time: ${formattedTime}`;
	return formattedLocalTime;
};
