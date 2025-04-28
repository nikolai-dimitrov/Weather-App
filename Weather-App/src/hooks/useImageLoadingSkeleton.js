import { useState, useEffect } from "react";
export const useImageLoadingSkeleton = (isLoading) => {
	const [isImageLoading, setIsImageLoading] = useState(true);

	useEffect(() => {
		// It triggers on api call if fetch isn't completed for less than 300ms.
		setIsImageLoading(true);
	}, [isLoading]);

	const triggerImageLoading = () => {
		setIsImageLoading(true);
	};

	const onLoadImageHandler = (imageSkeletonDelayRef = null) => {
		if (imageSkeletonDelayRef && imageSkeletonDelayRef.current) {
			clearTimeout(imageSkeletonDelayRef.current);
		}
		setIsImageLoading(false);
	};

	return { isImageLoading, triggerImageLoading, onLoadImageHandler };
};
