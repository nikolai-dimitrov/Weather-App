import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { OpeningAnimation } from './components/OpeningAnimation/OpeningAnimation';

import { fetchWeatherData, extractWeatherData } from './services/weatherApiService';
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const timeOut = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timeOut);
  }, []);

  useEffect(() => {
    getGeoLocation();
    const getWeatherData = async () => {
      try {
        // const weatherData = await extractWeatherData(currentLocation);
        // setWeatherData(weatherData);
      } catch (error) {
        console.log(error.message)
      }
    }
    // getWeatherData()
  }, []);

  // TODO: Display errors into popup
  const getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position["coords"];
          setCurrentLocation({ latitude, longitude });

          const weatherData = await extractWeatherData({ latitude, longitude });
          setWeatherData(weatherData);
        },
        (error) => {
          console.log("There is problem getting user location.");
        })
    } else {
      console.log("Geolocation is not available.");
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
              <Navbar getGeoLocation={getGeoLocation} />
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
