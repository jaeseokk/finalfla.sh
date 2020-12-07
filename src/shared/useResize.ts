import { useLayoutEffect, useState, useCallback } from 'react'

const useWindowResize = () => {
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  const handleResize = useCallback(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }, [])

  useLayoutEffect(() => {
    window.addEventListener('resize', handleResize, false)

    return () => {
      window.removeEventListener('resize', handleResize, false)
    }
  }, [handleResize])

  return {
    width,
    height,
  }
}

export default useWindowResize
