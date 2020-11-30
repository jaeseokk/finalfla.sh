import React from 'react'
import styles from './Background.module.scss'

const Background = () => {
  return (
    <svg className={styles.Background} width="100%" height="100%">
      <filter id="noise" x="0" y="0" width="100%" height="100%">
        <feTurbulence baseFrequency="0.01" type="fractalNoise" />
      </filter>
      <rect x="0" y="0" width="100%" height="100%" filter="url(#noise)" />
    </svg>
  )
}

export default Background
