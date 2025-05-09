import { useState, useEffect, useContext } from 'react';
import { WeatherContext } from './contexts/WeatherContext';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './components/Home/Home';
import { Footer } from './components/Footer/Footer';
import { OpeningAnimation } from './components/OpeningAnimation/OpeningAnimation';
import { ErrorScreen } from './components/ErrorScreen/ErrorScreen';

import { validateWeatherForm } from './validators/validateWeatherForm';
import './App.css';


function App() {
  const { updateQueryByGeolocation, showErrorScreen } = useContext(WeatherContext);
  const [showOpeningAnimation, setShowOpeningAnimation] = useState(true);
  useEffect(() => {
    const timeOut = setTimeout(() => setShowOpeningAnimation(false), 4000);
    // Get geolocation and update queryString with your current location on component mount.
    updateQueryByGeolocation();
    return () => clearTimeout(timeOut);
  }, []);

  return (
    <>
      {
        showOpeningAnimation ? (
          <OpeningAnimation />
        ) : (

          showErrorScreen ? (
            <ErrorScreen />

          ) : (
            <>
              <header>
                <Navbar />
              </header>
              <main>
                <Home />
              </main>
              <footer>
                <Footer />
              </footer>
            </>
          )

        )
      }
    </>
  )
}

export default App
