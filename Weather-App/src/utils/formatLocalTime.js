export const formatLocalTime = (localtime) => {
	const dateArray = localtime.split(" ")[0].split("-");
	const [year, , day] = dateArray;
	const dayName = Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
		new Date(localtime)
	);
	const monthName = Intl.DateTimeFormat("en-US", { month: "long" }).format(
		new Date(localtime)
	);

	const formattedTime = Intl.DateTimeFormat("default", {
		hour12: true,
		hour: "numeric",
		minute: "numeric",
	}).format(new Date(localtime));

	const formattedLocalTime = `${dayName}, ${day} ${monthName} ${year} | Local time: ${formattedTime}`;
	return formattedLocalTime;
};
