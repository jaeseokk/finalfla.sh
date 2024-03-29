import React from 'react'

import styles from './ShareButton.module.scss'

interface ShareButtonProps {
  isExibitionMode: boolean
  onClick: () => void
}

const ShareButton: React.FC<ShareButtonProps> = ({
  isExibitionMode,
  onClick,
}) => {
  return (
    <button
      className={styles.ShareButton}
      onClick={() => {
        if (isExibitionMode) {
          return
        }

        onClick()
      }}
    >
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="9.15 4.86 104.48 108.99"
      >
        <g>
          <path
            fill="#D2D2D2"
            d="M107.07,54c-0.93-7.4-2.24-14.71-3.99-21.96c-0.43-1.8-1.48-3.08-2.8-3.9c-1.06-2.25-2.62-4.29-4.46-5.77
		c-1.89-1.53-4.41-2.72-7.05-3.33c-3.21-1.32-6.82-1.59-10.19-0.6c-0.08-0.05-0.16-0.11-0.24-0.16c-1.72-2.18-4.01-3.93-6.64-4.81
		c-1.46-0.49-2.94-0.68-4.38-0.62c-0.68-0.36-1.37-0.69-2.07-0.99c-1.88-1.98-4.84-2.83-7.37-2.07c-0.24-0.03-0.49-0.06-0.73-0.09
		c-1.87-0.19-3.41,0.46-4.56,1.56c-2.8,0.55-5.15,2.62-6.73,5.34c-0.19,0.14-0.38,0.28-0.57,0.43c-2.42,0.33-4.79,1.37-6.77,3.29
		c-0.37,0.36-0.7,0.74-1.01,1.14c-2.34,1.28-4.33,3.28-5.78,5.65c-0.96,0.6-1.86,1.32-2.65,2.17c-1.45,0.83-2.76,1.89-3.83,3.14
		c-0.82,0.6-1.64,1.2-2.53,1.75c-2.19,1.35-4.75,1.9-6.71,3.64c-3.09,2.74-3.93,6.7-2.68,10.08c-0.37,0.84-0.57,1.77-0.53,2.74
		c0.15,3.17,0.72,6.1,1.78,8.92c0.64,5.27,1.64,10.47,3.09,15.6c0.12,0.42,0.27,0.8,0.44,1.17c-0.07,0.65-0.06,1.33,0.05,2.02
		c0.82,5.18,1.39,12.08,5.09,16.12c3.98,4.35,10.75,4.46,16.12,5.68c5.91,1.34,11.76,2.96,17.52,4.86
		c5.7,1.87,11.38,4.74,17.52,4.05c1.37-0.15,2.69-0.68,3.83-1.44c1.5-0.11,2.95-0.73,4.12-1.99c4.76-5.17,9.53-10.33,14.09-15.69
		c4.07-4.78,9.58-10.16,11.28-16.37C109.37,67.54,107.83,60.04,107.07,54z"
          />
          <path
            d="M9.16,49.82c-0.07-6.26,1.87-11.39,6.66-15.16C28.1,25,40.38,15.34,52.97,6.1c1.93-1.41,5.82-1.57,8.21-0.69
			C73.5,9.93,85.6,15.06,97.85,19.79c4.32,1.67,6.55,4.5,7.44,9.02c2.64,13.36,5.69,26.65,8.24,40.03c0.4,2.08-0.3,5.05-1.62,6.67
			c-9.98,12.23-20.13,24.32-30.54,36.18c-1.36,1.55-4.78,2.54-6.81,2.04c-16.93-4.18-33.81-8.61-50.57-13.44
			c-2.29-0.66-4.95-3.71-5.5-6.1C15.06,79.47,12.2,64.62,9.16,49.82z M15.43,47c3.24,15.26,6.36,30.05,9.59,44.8
			c0.19,0.88,1.23,2.02,2.09,2.25c15.7,4.23,31.43,8.37,47.19,12.37c1.13,0.29,3.06-0.29,3.81-1.16
			c9.39-10.98,18.67-22.05,27.86-33.2c0.69-0.84,0.91-2.48,0.68-3.61c-2.68-12.84-5.43-25.67-8.39-38.44
			c-0.33-1.43-1.83-3.12-3.21-3.71c-9.48-4.03-19.22-7.47-28.56-11.76c-6.02-2.77-10.72-2.96-16.11,1.69
			C39.95,25.22,28.9,33.48,18.23,42.19C16.9,43.28,16.37,45.34,15.43,47z"
          />
          <path
            d="M58.78,97.71c-21.04,1.03-38.04-21.4-35.92-35.82c3.22-21.88,15.28-42,39.98-39.49c24.6,2.5,37.47,16.38,35.77,39.91
			C97.11,83,85.15,98.79,58.78,97.71z M59.45,91.37C80.74,92.39,90.5,79.65,92.88,62.6c3.38-24.21-22.85-42.34-45.29-32.28
			c-13.11,5.88-16.17,18.3-18.48,30.59c-0.78,4.18,0.37,9.62,2.58,13.31C38.04,84.8,46.59,92.72,59.45,91.37z"
          />
          <path
            d="M86.3,59.09c0.07,15.46-11.29,28.05-25.42,28.18C46.13,87.39,35.14,75.12,34.94,58.3c-0.15-12.4,13.89-26.75,26.32-26.92
			C75.36,31.18,86.22,43.2,86.3,59.09z"
          />
        </g>
      </svg>
      {!isExibitionMode && <div className={styles.label}>SHARE</div>}
    </button>
  )
}

export default ShareButton
