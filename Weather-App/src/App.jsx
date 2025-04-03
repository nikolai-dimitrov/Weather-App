import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Main } from './components/Main/Main';
import { OpeningAnimation } from './components/OpeningAnimation/OpeningAnimation';

import { extractWeatherData } from './services/weatherApiService';
import { validateWeatherForm } from './validators/validateWeatherForm';
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [disableLocationBtn, setDisableLocationBtn] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timeOut = setTimeout(() => setIsLoading(false), 4000);
    fetchWeatherWithCurrentLocation()
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

  const searchWeatherFormSubmitHandler = async (e, searchedLocation) => {
    e.preventDefault();
    const isValid = validateWeatherForm(searchedLocation.location);
    if (!isValid) {
      return;
    }

    try {
      const weatherData = await extractWeatherData(searchedLocation);
      setWeatherData(weatherData);
      setError(null);

    } catch (error) {
      setError(error.message);
    }

  };

  const clearError = () => {
    setError(null);
  }

  console.log(weatherData)
  console.log(error)
  return (
    <>

      {
        isLoading ? (
          <OpeningAnimation />
        ) : (
          <>
            <header>
              <Navbar fetchWeatherWithCurrentLocation={fetchWeatherWithCurrentLocation} searchWeatherFormSubmitHandler={searchWeatherFormSubmitHandler} disableLocationBtn={disableLocationBtn} />
            </header>
            <main>
              <Main error={error} clearError={clearError} />
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
