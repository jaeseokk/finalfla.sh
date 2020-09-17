import { useState, useCallback, useMemo, useReducer, Reducer } from 'react'

const useHistory = <T>(initialState: T) => {
  const [history, setHistory] = useState<{
    past: T[]
    current: T
    future: T[]
  }>({
    past: [],
    current: initialState,
    future: [],
  })

  const set = useCallback(
    (snapshot) => {
      setHistory((prev) => {
        return {
          past: [...prev.past, prev.current],
          current: snapshot,
          future: [],
        }
      })
    },
    [history]
  )
  const undo = useCallback(() => {
    if (history.past.length === 0) {
      return
    }

    setHistory((prev) => {
      const snapshot = prev.past[prev.past.length - 1]
      const nextPast = prev.past.slice(0, -1)

      return {
        past: nextPast,
        current: snapshot,
        future: [...prev.future, prev.current],
      }
    })
  }, [history])
  const redo = useCallback(() => {
    if (history.future.length === 0) {
      return
    }

    setHistory((prev) => {
      const snapshot = prev.future[prev.future.length - 1]
      const nextFuture = prev.future.slice(0, -1)

      return {
        past: [...prev.past, prev.current],
        current: snapshot,
        future: nextFuture,
      }
    })
  }, [history])

  return {
    history,
    set,
    undo,
    redo,
  }
}

export default useHistory
