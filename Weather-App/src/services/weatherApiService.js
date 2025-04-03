const API_KEY = "bdf42325dd664721bf0112934252503"; //3
const BASE_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}`;

export const fetchWeatherData = async (queryString) => {
	const url = `${BASE_URL}&q=${queryString}&days=3`;
	try {
		const response = await fetch(url);
		const data = await response.json();

		// If there is an error, API response contains error object including message and error code for 4xx HTTP Status codes.
		// Api HTTP Status codes for errors are only 400, 401, 403.
		if (!response.ok) {
			if (process.env.NODE_ENV === "development") {
				throw data.error;
			} else {
				if (data.error.code === 1006) {
					throw data.error;
				} else {
					data.error.message = "Something went wrong!";
					throw data.error;
				}
			}
		}
		return data;
	} catch (error) {
		throw error;
	}
};

export const extractWeatherData = async (locationParams) => {
	let queryString = "";
	if (locationParams.hasOwnProperty("latitude")) {
		queryString = `${locationParams.latitude},${locationParams.longitude}`;
	} else if (locationParams.hasOwnProperty("location")) {
		queryString = `${locationParams.location}`;
	}
	try {
		const weatherData = await fetchWeatherData(queryString);

		const {
			current: { humidity },
			current: { wind_kph },
			current: { feelslike_c },
			current: { feelslike_f },
			current: { temp_c },
			current: { temp_f },
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
			day: { maxtemp_f },
			day: { mintemp_f },
			day: { mintemp_c },
		} = forecastday[0];

		return {
			humidity,
			wind_kph,
			feelslike_c,
			feelslike_f,
			temp_c,
			temp_f,
			country,
			region,
			name,
			localtime,
			text,
			forecastday,
			sunrise,
			sunset,
			maxtemp_c,
			maxtemp_f,
			mintemp_c,
			mintemp_f,
			forecastday,
		};
	} catch (error) {
		throw error;
	}
};
