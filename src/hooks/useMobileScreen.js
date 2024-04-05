import {useEffect, useState} from "react";

const useMobileScreen = () => {

  const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth <= 960)

  useEffect(() => {
    const onWindowResize = () => {
      if (window.innerWidth <= 960) {
        setIsMobileScreen(true)
      } else {
        setIsMobileScreen(false)
      }
    }

    window.addEventListener('resize', onWindowResize)

    return () => {
      window.removeEventListener('resize', onWindowResize)
    }
  }, []);
  
  return isMobileScreen
}

export default useMobileScreen