import { useState, useEffect, useContext } from 'react';
import { WeatherContext } from './contexts/WeatherContext';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './components/Home/Home';
import { Footer } from './components/Footer/Footer';
import { OpeningAnimation } from './components/OpeningAnimation/OpeningAnimation';

import { validateWeatherForm } from './validators/validateWeatherForm';
import './App.css';

function App() {
  const { weatherData, isLoading, updateQueryByGeolocation } = useContext(WeatherContext);
  // const [queryString, setQueryString] = useState(null);
  // const [unit, setUnit] = useState("C");
  const [showOpeningAnimation, setShowOpeningAnimation] = useState(true);
  // const [showLoadingSkeleton, setShowLoadingSkeleton] = useState(false);
  // const [disableLocationBtn, setDisableLocationBtn] = useState(false);
  // const [error, setError] = useState(null);
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
      }
    </>
  )
}

export default App
