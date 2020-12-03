import React, { useCallback, useState } from 'react'

import styles from './Loading.module.scss'

interface LoadingProps {
  ready: boolean
  onClick: () => void
}

const Loading: React.FC<LoadingProps> = ({ ready, onClick }) => {
  const [showSoundsOn, setShowSoundsOn] = useState(false)
  const handleClick = useCallback(() => {
    if (!ready) {
      return
    }

    setShowSoundsOn(true)

    setTimeout(() => {
      onClick()
    }, 1000)
  }, [ready])

  return (
    <div className={styles.Loading} onClick={handleClick}>
      <div className={styles.content}></div>
      <div className={styles.text}>
        {ready &&
          (showSoundsOn ? (
            <div>
              <span>SOUND ON!</span> <span>VOLUME UP!</span>
            </div>
          ) : (
            <div>CLICK TO START</div>
          ))}
      </div>
    </div>
  )
}

export default Loading
