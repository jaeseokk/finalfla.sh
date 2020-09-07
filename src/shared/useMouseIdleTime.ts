import {
  useRef,
  useLayoutEffect,
  useCallback,
  useEffect,
  useState,
} from 'react'

const useMouseIdleTime = ({ active }: any) => {
  const [idle, setIdle] = useState(false)
  const [interacting, setInteracting] = useState(false)
  const rafRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)
  const animate = (time: number) => {
    if (!active) {
      return
    }

    if (!lastTimeRef.current || interacting) {
      lastTimeRef.current = time
    }

    const timeDiff = time - lastTimeRef.current

    if (timeDiff > 5000) {
      setIdle(true)
      rafRef.current && cancelAnimationFrame(rafRef.current)
    }

    rafRef.current = requestAnimationFrame(animate)
  }
  const handleMouseMove = useCallback(() => {
    setIdle(false)
    lastTimeRef.current = 0
  }, [])
  const handleMouseDown = useCallback(() => {
    setInteracting(true)
  }, [])
  const handleMouseUp = useCallback(() => {
    setInteracting(false)
  }, [])
  useLayoutEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseMove])
  useEffect(() => {
    if (active) {
      rafRef.current = requestAnimationFrame(animate)
    } else {
      rafRef.current && cancelAnimationFrame(rafRef.current)
    }
    return () => {
      rafRef.current && cancelAnimationFrame(rafRef.current)
    }
  }, [active])

  return { idle }
}

export default useMouseIdleTime
