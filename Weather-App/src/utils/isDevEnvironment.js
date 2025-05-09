export const isDevEnvironment = (error) => {
	if (process.env.NODE_ENV === "development") {
		return true;
	} else {
		return false;
	}
};
