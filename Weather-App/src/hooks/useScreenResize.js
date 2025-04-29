import { useState, useEffect } from "react";
export const useScreenResize = () => {
	const [isMobile, setIsMobile] = useState(() => {
		if (window.innerWidth < 500) {
			return true;
		} else {
			return false;
		}
	});

	const updateIsMobile = () => {
		if (window.innerWidth < 500) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	};

	const throttleResize = () => {
		let timeout = null;
		return function () {
			if (timeout) {
				clearTimeout(timeout);
			}

			timeout = setTimeout(() => {
				updateIsMobile();
			}, 200);
		};
	};

	useEffect(() => {
		const resizeHandler = throttleResize();

		window.addEventListener("resize", resizeHandler);
		return () => removeEventListener("resize", resizeHandler);
	}, []);

	return isMobile;
};
