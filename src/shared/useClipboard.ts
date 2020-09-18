import Clipboard from 'clipboard'
import { useEffect, useRef } from 'react'

const useClipboard = (el: Element | null) => {
  const clipboardRef = useRef<Clipboard>()
  useEffect(() => {
    if (!el) {
      return
    }

    clipboardRef.current = new Clipboard(el)

    return () => {
      clipboardRef.current && clipboardRef.current.destroy()
    }
  }, [el])
}

export default useClipboard
