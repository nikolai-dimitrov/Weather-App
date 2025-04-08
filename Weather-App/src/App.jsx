import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './components/Home/Home';
import { OpeningAnimation } from './components/OpeningAnimation/OpeningAnimation';

import { extractWeatherData } from './services/weatherApiService';
import { validateWeatherForm } from './validators/validateWeatherForm';
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState("C");
  const [disableLocationBtn, setDisableLocationBtn] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timeOut = setTimeout(() => setIsLoading(false), 4000);
    fetchWeatherWithCurrentLocation();
    return () => clearTimeout(timeOut);
  }, []);

  const fetchWeatherWithCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position["coords"];
          try {
            const weatherData = await extractWeatherData({ latitude, longitude });
            setWeatherData(weatherData);
            setError(null);
          } catch (error) {
            setError(error.message);
          }
        },
        async (error) => {
          const weatherData = await extractWeatherData({ location: "London" });
          setWeatherData(weatherData);
          setDisableLocationBtn(true);
          setError("Can not access your location!");
        });
    }
  };

  const searchWeatherFormSubmitHandler = async (e, searchedLocation, clearInput) => {
    e.preventDefault();
    const isValid = validateWeatherForm(searchedLocation.location);
    if (!isValid) {
      return;
    }

    try {
      const weatherData = await extractWeatherData(searchedLocation);
      setWeatherData(weatherData);
      setError(null);
      clearInput();
    } catch (error) {
      setError(error.message);
    }

  };

  const clearError = () => {
    setError(null);
  }

  const changeUnits = (newUnit) => {
    if (newUnit != unit) {
      setUnit((state) => (newUnit));
    }
  }

  return (
    <>

      {
        isLoading ? (
          <OpeningAnimation />
        ) : (
          <>
            <header>
              <Navbar
                fetchWeatherWithCurrentLocation={fetchWeatherWithCurrentLocation}
                searchWeatherFormSubmitHandler={searchWeatherFormSubmitHandler}
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
