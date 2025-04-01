import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { OpeningAnimation } from './components/OpeningAnimation/OpeningAnimation';

import { extractWeatherData } from './services/weatherApiService';
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const timeOut = setTimeout(() => setIsLoading(false), 4000);
    fetchWeatherWithCurrentLocation()
    return () => clearTimeout(timeOut);
  }, []);

  // TODO: Display errors into popup
  const fetchWeatherWithCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position["coords"];

          const weatherData = await extractWeatherData({ latitude, longitude });
          setWeatherData(weatherData);
        },
        (error) => {
          // warning popup or/and set variable to false and disable location btn fetch with Paris param
          console.log("There is problem getting user location.");
        })
    } else {
      // warning popup or/and set variable to false and disable location btn fetch with Paris param
      console.log("Geolocation is not available.");
    }
  };

  const searchWeatherFormSubmitHandler = async (e, searchedLocation) => {
    e.preventDefault();
    const weatherData = await extractWeatherData(searchedLocation);
    setWeatherData(weatherData)
  };

  return (
    <>

      {
        isLoading ? (
          <OpeningAnimation />
        ) : (
          <>
            <header>
              <Navbar fetchWeatherWithCurrentLocation={fetchWeatherWithCurrentLocation} searchWeatherFormSubmitHandler={searchWeatherFormSubmitHandler} />
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
