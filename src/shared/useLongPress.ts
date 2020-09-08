import { useRef, useCallback } from 'react'

interface UseLongPressOptions {
  delay?: number
}

const useLongPress = (
  onLongPress: (e: MouseEvent | React.MouseEvent) => void,
  onClick: (e: MouseEvent | React.MouseEvent) => void,
  { delay = 300 }: UseLongPressOptions = {}
) => {
  const timeout = useRef<NodeJS.Timeout>()
  const longPressedRef = useRef<boolean>(false)
  const startInteracting = useCallback(
    (e: MouseEvent | React.MouseEvent) => {
      timeout.current = setTimeout(() => {
        onLongPress(e)
        longPressedRef.current = true
      }, delay)
    },
    [onLongPress]
  )
  const clearInteracting = useCallback(
    (e?: MouseEvent | React.MouseEvent) => {
      timeout.current && clearTimeout(timeout.current)
      if (!longPressedRef.current && e) {
        onClick(e)
      }
      longPressedRef.current = false
    },
    [onClick]
  )
  const forceTrigerLongPress = useCallback(
    (e: MouseEvent | React.MouseEvent) => {
      timeout.current && clearTimeout(timeout.current)
      onLongPress(e)
      longPressedRef.current = false
    },
    [onLongPress]
  )

  return {
    startInteracting,
    clearInteracting,
    forceTrigerLongPress,
  }
}

export default useLongPress
