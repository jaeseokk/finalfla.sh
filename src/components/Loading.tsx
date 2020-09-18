import React, { useCallback } from 'react'

import styles from './Loading.module.scss'

interface LoadingProps {
  ready: boolean
  onClick: () => void
}

const Loading: React.FC<LoadingProps> = ({ ready, onClick }) => {
  const handleClick = useCallback(() => {
    if (!ready) {
      return
    }

    onClick()
  }, [ready])
  return (
    <div className={styles.Loading} onClick={handleClick}>
      <div className={styles.content}></div>
      <div className={styles.text}>{ready && <div>CLICK TO START</div>}</div>
    </div>
  )
}

export default Loading
