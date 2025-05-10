import { useState } from "react";
const checkDevEnvironment = (error) => {
	if (process.env.NODE_ENV === "development") {
		return true;
	} else {
		return false;
	}
};

export const useProcessError = () => {
	const [error, setError] = useState({
		message: null,
		code: null,
	});
	const [showErrorScreen, setShowErrorScreen] = useState(false);

	const processError = (error) => {
		const isDevEnvironment = checkDevEnvironment(error);
		if (isDevEnvironment) {
			setError((prev) => ({
				...prev,
				message: error?.message,
				code: error?.code,
			}));
		} else {
			if (error.code == 1006 || error.code == 1) {
				setError((prev) => ({
					...prev,
					message: error?.message,
					code: error?.code,
				}));
			} else {
				setShowErrorScreen(true);
			}
		}
	};

	const clearError = () => {
		if (error?.code == 1) {
			setTimeout(() => {
				setError(null);
			}, 7000);
		} else {
			setError(null);
		}
	};

	const hideErrorScreen = () => {
		setShowErrorScreen(false);
	};

	return {
		error,
		processError,
		clearError,
		showErrorScreen,
		hideErrorScreen,
	};
};
