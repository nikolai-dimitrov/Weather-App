import { useState, useEffect, createContext } from "react";
import { useProcessError } from "../hooks/useProcessError";
import { extractWeatherData } from "../services/weatherApiService";

import { validateWeatherForm } from "../validators/validateWeatherForm";

export const WeatherContext = createContext();
export const WeatherProvider = ({ children }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [queryString, setQueryString] = useState(null);
    const [unit, setUnit] = useState("C");
    const [isLoading, setIsLoading] = useState(true);
    const [showLoadingSkeleton, setShowLoadingSkeleton] = useState(false);
    const [disableLocationBtn, setDisableLocationBtn] = useState(false);
    const { error, processError, clearError, showErrorScreen, hideErrorScreen } = useProcessError();


    useEffect(() => {
        // Using showLoadingSkeleton && isLoading prevent skeleton blinking.Skeleton will be shown if fetch isn't completed for less than 300ms.
        const skeletonDelay = setTimeout(() => setShowLoadingSkeleton(true), 300);

        const fetchAndUpdateWeather = async () => {
            if (!queryString) {
                return;
            }

            setIsLoading(isLoading => true);
            hideErrorScreen();
            try {
                const data = await extractWeatherData(queryString);
                setWeatherData(data);
                clearTimeout(skeletonDelay)
                setIsLoading(isLoading => false);
                setShowLoadingSkeleton(false);
                clearError()
            } catch (error) {
                processError(error);
            };
        };

        fetchAndUpdateWeather();
        return () => clearTimeout(skeletonDelay);
    }, [queryString])

    const updateQueryByGeolocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position["coords"];
                    setQueryString((queryString) => (`${latitude}, ${longitude}`));
                },
                (error) => {
                    setQueryString((queryString) => ('London'));
                    setDisableLocationBtn(true);
                    processError(error);
                }
            )
        };
    };

    const searchFormSubmitHandler = (e, searchedLocation, clearInput) => {
        e.preventDefault();
        const isValid = validateWeatherForm(searchedLocation.location);
        if (!isValid) {
            return;
        }
        setQueryString((queryString) => (searchedLocation.location));
        clearInput();
    };

    const geoLocationBtnClickHandler = () => {
        updateQueryByGeolocation();
    }

    const changeUnits = (newUnit) => {
        if (newUnit != unit) {
            setUnit((state) => (newUnit));
        };
    };

    const values = {
        ...weatherData,
        unit,
        isLoading: isLoading && showLoadingSkeleton,
        disableLocationBtn,
        error,
        showErrorScreen,
        updateQueryByGeolocation,
        searchFormSubmitHandler,
        geoLocationBtnClickHandler,
        clearError,
        changeUnits,
    }

    return (
        <WeatherContext.Provider value={values}>
            {children}
        </WeatherContext.Provider>
    )
};