import {useEffect, useState} from "react";

const useBigScreen = () => {

  const [isBigScreen, setIsBigScreen] = useState(window.innerWidth > 1720)


  useEffect(() => {
    const onWindowResize = () => {
      if (window.innerWidth <= 1720) {
        setIsBigScreen(false)
      } else {
        setIsBigScreen(true)
      }
    }

    window.addEventListener('resize', onWindowResize)

    return () => {
      window.removeEventListener('resize', onWindowResize)
    }
  }, []);

  return isBigScreen
}

export default useBigScreen