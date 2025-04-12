import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './components/Home/Home';
import { OpeningAnimation } from './components/OpeningAnimation/OpeningAnimation';

import { extractWeatherData } from './services/weatherApiService';
import { validateWeatherForm } from './validators/validateWeatherForm';
import './App.css'

function App() {
  const [showOpeningAnimation, setShowOpeningAnimation] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [queryString, setQueryString] = useState(null);
  const [unit, setUnit] = useState("C");
  const [disableLocationBtn, setDisableLocationBtn] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timeOut = setTimeout(() => setShowOpeningAnimation(false), 4000);
    updateQueryByGeolocation();
    return () => clearTimeout(timeOut);
  }, []);

  useEffect(() => {
    const fetchAndUpdateWeather = async () => {
      try {
        const data = await extractWeatherData(queryString);
        setWeatherData(data);
        setError(null);
      } catch (error) {
        setError(error.message);
      };
    };
    fetchAndUpdateWeather();
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
          setError("Can not access your location!");
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

  const clearError = () => {
    setError(null);
  };

  const changeUnits = (newUnit) => {
    if (newUnit != unit) {
      setUnit((state) => (newUnit));
    };
  };

  return (
    <>

      {
        showOpeningAnimation ? (
          <OpeningAnimation />
        ) : (
          <>
            <header>
              <Navbar
                geoLocationBtnClickHandler={geoLocationBtnClickHandler}
                searchFormSubmitHandler={searchFormSubmitHandler}
                disableLocationBtn={disableLocationBtn}
                changeUnits={changeUnits}
              />
            </header>
            <main>
              <Home error={error} clearError={clearError} unit={unit} {...weatherData} />
            </main>
            <footer>

            </footer>
          </>
        )
      }
    </>
  )
}

export default App
