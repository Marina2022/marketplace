import { useEffect } from "react";

export const useViewportHeight = () => {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    setVh() // первый вызов
    window.addEventListener('resize', setVh)

    return () => window.removeEventListener('resize', setVh)
  }, [])
}
