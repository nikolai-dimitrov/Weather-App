import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { OpeningAnimation } from './components/OpeningAnimation/OpeningAnimation';
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    const timeOut = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timeOut);
  }, [])

  useEffect(() => {
    getGeoLocation();
  }, [])

  // TODO: Display errors into popup
  const getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position["coords"];
        setCurrentLocation({ latitude, longitude });
      },
        (error) => {
          console.log("There is problem getting user location.")
        })
    } else {
      console.log("Geolocation is not available.")
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
