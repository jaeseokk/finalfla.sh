import { useLayoutEffect, useCallback, useState } from 'react'
import { calculateAngle } from './utils'

const discretizeValue = (angle: number, min: number, max: number) => {
  const range = max - min + 1
  const adjustedAngle = angle < 0 ? 360 + angle : angle
  const value = Math.ceil((adjustedAngle * range) / 360) + min

  if (value > max) {
    return -1
  }

  return value
}

const getOrigin = () => {
  const { innerWidth, innerHeight } = window

  return {
    x: innerWidth / 2,
    y: innerHeight / 2,
  }
}

const useDial = ({
  initialValue = 0,
  min = 0,
  max,
  active,
  dialAreaElement = window,
}: any) => {
  const [value, setValue] = useState(initialValue)
  const updateValue = useCallback(
    (pageX: number, pageY: number) => {
      const { x: originX, y: originY } = getOrigin()
      const angle = calculateAngle(originX, originY, pageX, pageY)

      setValue(discretizeValue(angle, min, max))
    },
    [min, max]
  )
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!active) {
        return
      }

      const { pageX, pageY } = e

      updateValue(pageX, pageY)
    },
    [active]
  )
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!active) {
        return
      }

      if (!e.changedTouches || e.changedTouches.length < 1) {
        return
      }

      const { pageX, pageY } = e.changedTouches[0]

      updateValue(pageX, pageY)
    },
    [active]
  )

  useLayoutEffect(() => {
    if (active) {
      dialAreaElement.addEventListener('mousemove', handleMouseMove)
      dialAreaElement.addEventListener('touchmove', handleTouchMove)
    } else {
      dialAreaElement.removeEventListener('mousemove', handleMouseMove)
      dialAreaElement.removeEventListener('touchmove', handleTouchMove)
    }

    return () => {
      dialAreaElement.removeEventListener('mousemove', handleMouseMove)
      dialAreaElement.removeEventListener('touchmove', handleTouchMove)
    }
  }, [handleMouseMove, active])

  return {
    value,
  }
}

export default useDial
