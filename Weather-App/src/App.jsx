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
    const data = fetchWeatherWithCurrentLocation()
    setWeatherData(data)

    return () => clearTimeout(timeOut);
  }, []);


  const fetchWeatherWithCurrentLocation = () => {
    console.log('invoked')
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position["coords"];
          setCurrentLocation({ latitude, longitude });

          const weatherData = await extractWeatherData({ latitude, longitude });
          return weatherData

        },
        (error) => {
          console.log("There is problem getting user location.");
        })
    } else {
      console.log("Geolocation is not available.");
    }
  }

  // TODO: Display errors into popup


  // const processWeatherData = async (currentLocation) => {
  //   try {
  //     const weatherData = await extractWeatherData(currentLocation);
  //     setWeatherData(weatherData);
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }
  return (
    <>

      {
        isLoading ? (
          <OpeningAnimation />
        ) : (
          <>
            <header>
              <Navbar fetchWeatherWithCurrentLocation={fetchWeatherWithCurrentLocation} />
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
