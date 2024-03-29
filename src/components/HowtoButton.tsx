import React from 'react'

import styles from './HowtoButton.module.scss'

interface HowtoButtonProps {
  onClick: () => void
  isExibitionMode: boolean
}

const HowtoButton: React.FC<HowtoButtonProps> = ({
  isExibitionMode,
  onClick,
}) => {
  return (
    <button
      className={styles.HowtoButton}
      onClick={() => {
        if (isExibitionMode) {
          return
        }

        onClick()
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 106.92 111.23">
        <g>
          <path
            d="M99.1,49.54c-2.93,12.62-6.28,25.14-9.29,37.74-.85,3.52-2.77,5.14-6.21,6-12.4,3.1-24.73,6.52-37.13,9.66a6,6,0,0,1-4.5-.64q-16.2-12-32.12-24.46c-1.2-.94-1.58-2.93-2.34-4.42C10.22,60,13.53,47,15.22,33.9c1-8,4.55-12.32,11.84-14.67,11.06-3.56,22-7.51,33.08-11,1.3-.42,3.65.47,4.71,1.55Q81.46,26.64,97.68,43.9A7.18,7.18,0,0,1,99.1,49.54Z"
            fill="#d2d2d2"
          />
          <path d="M0,74.47C2.9,60.06,5.59,46.72,8.28,33.38a2.85,2.85,0,0,0,.13-.48C8.3,18.79,18.14,13.76,29.33,10,38,7.08,46.84,4.66,55.26,1.19,61-1.19,65.45.14,69.29,4q18.24,18.43,36,37.32a8,8,0,0,1,1.46,6.4c-3.69,15.33-7.58,30.63-11.82,45.82a9,9,0,0,1-5.33,5.21c-14.8,4.41-29.71,8.49-44.67,12.36-1.71.44-4.3-.62-5.87-1.8C27.66,100.72,16.25,92.08,5.2,83,2.71,81,1.61,77.22,0,74.47Zm7.51-1.23c.76,1.49,1.14,3.48,2.34,4.42Q25.77,90.08,42,102.12a6,6,0,0,0,4.5.64C58.87,99.62,71.2,96.2,83.6,93.1c3.44-.86,5.36-2.48,6.21-6,3-12.6,6.36-25.12,9.29-37.74a7.18,7.18,0,0,0-1.42-5.64Q81.5,26.41,64.85,9.58c-1.06-1.08-3.41-2-4.71-1.55-11.08,3.51-22,7.46-33.08,11-7.29,2.35-10.81,6.63-11.84,14.67C13.53,46.85,10.22,59.78,7.51,73.24Z" />
          <path d="M90,59.31c.08,19.15-18.22,34.08-34.24,34.52C36,94.38,17.24,78.27,16.89,61.15c-.56-27.62,15.92-41.47,37.87-42.34C74.29,18.05,89.46,32,90,59.31ZM23,58.15c-2.72,15.16,17,29.9,31.73,29.63,13.92-.26,29.11-13.66,28.81-27.25C83.08,38.17,74.75,25.38,55.05,25,38.7,24.59,23.67,33.76,23,58.15Z" />
          <path
            fill="#000000"
            d="M52.12,28.85c16.76.17,27.37,11.46,27.24,29-.11,14.3-11.64,23.71-28.74,23.7-15,0-22.1-13-22.54-29.3C27.73,39.07,38.83,28.72,52.12,28.85Z"
          />
        </g>
      </svg>
      {!isExibitionMode && <div className={styles.label}>HOW TO</div>}
    </button>
  )
}

export default HowtoButton
