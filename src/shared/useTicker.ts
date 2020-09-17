import { useState, useEffect, useCallback, useRef } from 'react'

const useTicker = (tickLength: number) => {
  const [tickIndex, setTickIndex] = useState<number>(-1)
  const [subscribers, setSubscribers] = useState<Function[]>([])
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const rafRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)

  const animate = (time: number) => {
    if (!isPlaying) {
      return
    }

    if (!lastTimeRef.current) {
      lastTimeRef.current = time
    }

    const timeDiff = time - lastTimeRef.current

    if (timeDiff > 500) {
      setTickIndex((prevTickIndex) => {
        return (prevTickIndex + 1) % tickLength
      })
      lastTimeRef.current = time
    }

    rafRef.current = requestAnimationFrame(animate)
  }

  const subscribe = useCallback(
    (subscriber: Function) => {
      setSubscribers(subscribers.concat(subscriber))
    },
    [subscribers]
  )

  const reset = useCallback(() => {
    setIsPlaying(false)
    setTickIndex(0)
    lastTimeRef.current = 0
  }, [])

  const start = useCallback(() => {
    reset()
    setIsPlaying(true)
  }, [reset])

  const pause = useCallback(() => {
    if (!isPlaying) {
      return
    }

    setIsPlaying(false)
  }, [isPlaying])

  const resume = useCallback(() => {
    if (isPlaying) {
      return
    }

    setIsPlaying(true)
  }, [isPlaying])

  const goTo = useCallback((indexToGo) => {
    setTickIndex(indexToGo)
  }, [])

  useEffect(() => {
    if (isPlaying) {
      rafRef.current = requestAnimationFrame(animate)
    }

    return () => {
      rafRef.current && cancelAnimationFrame(rafRef.current)
    }
  }, [isPlaying, subscribers])

  useEffect(() => {
    subscribers.forEach((subscriber) => {
      subscriber(tickIndex)
    })
  }, [tickIndex])

  return {
    tickIndex,
    isPlaying,
    subscribe,
    start,
    pause,
    resume,
    reset,
    goTo,
  }
}

export default useTicker
