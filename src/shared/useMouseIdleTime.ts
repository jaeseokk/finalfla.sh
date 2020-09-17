import {
  useRef,
  useLayoutEffect,
  useCallback,
  useEffect,
  useState,
} from 'react'

const useMouseIdleTime = ({
  active,
  mobile,
}: {
  active: boolean
  mobile?: boolean
}) => {
  const [idle, setIdle] = useState(false)
  const rafRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)
  const animate = useCallback(
    (time: number) => {
      if (!active) {
        return
      }

      if (!lastTimeRef.current) {
        lastTimeRef.current = time
      }

      const timeDiff = time - lastTimeRef.current

      if (timeDiff > 5000) {
        setIdle(true)
        rafRef.current && cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(animate)
    },
    [active]
  )
  const initIdleTime = useCallback(() => {
    setIdle(false)
    lastTimeRef.current = 0
  }, [])
  const handleMouseMove = useCallback(() => {
    initIdleTime()
  }, [])
  const handleMouseDown = useCallback(() => {
    initIdleTime()
  }, [])
  const handleMouseUp = useCallback(() => {
    initIdleTime()
  }, [])
  const handleTouchMove = useCallback(() => {
    initIdleTime()
  }, [])
  const handleTouchStart = useCallback(() => {
    initIdleTime()
  }, [])
  const handleTouchEnd = useCallback(() => {
    initIdleTime()
  }, [])
  useLayoutEffect(() => {
    if (active) {
      if (mobile) {
        window.addEventListener('touchstart', handleTouchStart)
        window.addEventListener('touchmove', handleTouchMove)
        window.addEventListener('touchend', handleTouchEnd)
      } else {
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)
      }
    } else {
      if (mobile) {
        window.removeEventListener('touchstart', handleTouchStart)
        window.removeEventListener('touchmove', handleTouchMove)
        window.removeEventListener('touchend', handleTouchEnd)
      } else {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mousedown', handleMouseDown)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }

    return () => {
      if (mobile) {
        window.removeEventListener('touchstart', handleTouchStart)
        window.removeEventListener('touchmove', handleTouchMove)
        window.removeEventListener('touchend', handleTouchEnd)
      } else {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mousedown', handleMouseDown)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [active])
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
