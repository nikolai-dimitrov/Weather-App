export const validateWeatherForm = (str) => {
	const regex = /^[A-Za-z]+( [A-Za-z]+)*$/;
	return regex.test(str);
};
