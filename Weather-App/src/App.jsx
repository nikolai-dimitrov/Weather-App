import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { OpeningAnimation } from './components/OpeningAnimation/OpeningAnimation';
import './App.css'

function App() {
  const [ isLoading, setIsLoading ] = useState(true);
  useEffect(() => {
    const timeOut = setTimeout(() => setIsLoading(false), 4000)
    return () => clearTimeout(timeOut)
  }, [])

  // console.log(navigator.geolocation.getCurrentPosition((position)=> {
  //   console.log(position)
  // }))
  return (
    <>

      {
        isLoading ? (
          <OpeningAnimation />
        ) : (
          <>
            <header>
              <Navbar />
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
