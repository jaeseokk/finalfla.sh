import { useCallback, useEffect, useState } from 'react'

const useExibitionMode = () => {
  const [isExibitionMode, setIsExibitionMode] = useState(false)
  const checkExibitionMode = useCallback(() => {
    const search = window.location.search
    const matches = search.match(/exibition=([^&]*)/)

    return matches?.[1] === '1' || matches?.[1] === 'true'
  }, [])

  useEffect(() => {
    setIsExibitionMode(checkExibitionMode())
  }, [checkExibitionMode])

  return {
    isExibitionMode,
  }
}

export default useExibitionMode
