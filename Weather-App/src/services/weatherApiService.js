const API_KEY = "bdf42325dd664721bf0112934252503";
const BASE_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}`;

export const fetchWeatherData = async (queryString) => {
	const url = `${BASE_URL}&q=${queryString}&days=3`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error.message);
	}
};

export const extractWeatherData = async (locationParams) => {
	let queryString = "";
	if (locationParams.hasOwnProperty("latitude")) {
		queryString = `${locationParams.latitude},${locationParams.longitude}`;
	} else if (locationParams.hasOwnProperty("location")) {
		queryString = `${locationParams.location}`;
	}

	const weatherData = await fetchWeatherData(queryString);

	const {
		current: { humidity },
		current: { wind_kph },
		current: { feelslike_c },
		current: { temp_c },
		current: {
			condition: { text },
		},

		location: { country },
		location: { localtime },
		location: { region },
		location: { name },
		forecast: { forecastday },
	} = weatherData;

	const {
		astro: { sunrise },
		astro: { sunset },
		day: { maxtemp_c },
		day: { mintemp_c },
	} = forecastday[0];

	return {
		humidity,
		wind_kph,
		feelslike_c,
		temp_c,
		country,
		region,
		name,
		localtime,
		text,
		forecastday,
		sunrise,
		sunset,
		maxtemp_c,
		mintemp_c,
	};
};
