import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { OpeningAnimation } from './components/OpeningAnimation/OpeningAnimation';

import { extractWeatherData } from './services/weatherApiService';
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [disableLocationBtn, setDisableLocationBtn] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => setIsLoading(false), 4000);
    fetchWeatherWithCurrentLocation()
    return () => clearTimeout(timeOut);
  }, []);

  // TODO: Display errors into popup
  const fetchWeatherWithCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position["coords"];

          const weatherData = await extractWeatherData({ latitude, longitude });
          setWeatherData(weatherData);
        },
        async (error) => {
          const weatherData = await extractWeatherData({ location: "London" });
          setWeatherData(weatherData);
          setDisableLocationBtn(true);
        });
    }
  };

  const searchWeatherFormSubmitHandler = async (e, searchedLocation) => {
    e.preventDefault();
    const weatherData = await extractWeatherData(searchedLocation);
    setWeatherData(weatherData)
  };

  console.log(weatherData)
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
