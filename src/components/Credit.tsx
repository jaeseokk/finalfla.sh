import React, { useState } from 'react'

import styles from './Popup.module.scss'
import { CSSTransition } from 'react-transition-group'
import clsx from 'clsx'

interface CreditProps {
  show: boolean
  onClose: () => void
}

const Credit: React.FC<CreditProps> = ({ show, onClose }) => {
  const [applyAnim, setApplyAnim] = useState(false)

  return (
    <>
      <CSSTransition
        in={show}
        classNames="popupOverlayTransition"
        timeout={300}
        unmountOnExit
      >
        <div className={styles.PopupOverlay} onClick={onClose}></div>
      </CSSTransition>
      <CSSTransition
        in={show}
        classNames="popupTransition"
        timeout={300}
        onEntered={() => {
          setApplyAnim(true)
        }}
        onExit={() => {
          setApplyAnim(false)
        }}
        unmountOnExit
      >
        <div className={styles.Popup} onClick={onClose}>
          <div className={styles.outer}>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="14.47 3.34 106.91 111.22"
            >
              <g>
                <path
                  fill="#D2D2D2"
                  d="M115.77,43.77c-0.37-2.21-1.63-4.24-3.76-5.47c-1.44-0.83-2.87-1.66-4.31-2.49c-0.58-0.33-1.15-0.69-1.73-1.01   c-0.14-0.15-0.29-0.29-0.41-0.45c-0.75-0.92-1.76-1.54-2.88-1.92c-0.64-0.86-1.51-1.58-2.66-2.13c-0.3-0.31-0.58-0.63-0.89-0.94   c-0.55-0.63-1.13-1.27-1.71-1.91c-2.8-3.09-5.8-5.96-8.96-8.66c-0.26-1.53-0.97-3.01-2.16-4.26c-2.33-2.44-5.03-4.57-7.88-6.37   c-1.4-0.88-3.01-1.2-4.59-1.05C72.77,6.7,71.55,6.61,70.26,7c-10.91,3.3-21.54,7.28-31.99,11.81c-2.19,0.95-3.1,2.56-3.14,4.26   c-0.31,0.2-0.58,0.41-0.84,0.62c-3.3,1-5.26,4.12-5.65,7.66c-0.29,2.59-1.9,5.66-2.63,8.25c-0.64,2.25-1.1,4.51-1.47,6.8   c-0.48,1.9-0.92,3.82-1.33,5.76c-0.22,0.6-0.41,1.2-0.55,1.81c-1.45,4.64-2.37,9.83-1.82,14.69c-0.66,0.93-1.09,2.05-1.19,3.27   c-0.2,2.61,0.08,5.09,0.65,7.64c0.3,1.32,0.99,2.31,1.89,3c2.52,4.47,6.91,8.05,11.73,10.6c1.64,0.87,3.26,1.85,4.86,2.86   c3.57,2.51,7.19,4.96,10.89,7.29c0.42,1.23,1.17,2.3,2.21,3c1.43,1.65,3.47,2.72,5.83,2.62c1.14-0.05,2.29-0.1,3.43-0.15   c0.14-0.01,0.28,0.01,0.42-0.01c1.12,0.55,2.46,0.78,3.99,0.48c6.71-1.33,13.41-2.71,20.11-4.11c0.67,0.05,1.39-0.01,2.15-0.22   c1.27-0.34,2.59-0.69,3.93-1.07c2.21-0.47,4.41-0.92,6.62-1.4c2.09-0.45,3.35-1.61,3.94-3.03c3.94-2.98,4.42-8.93,5.57-13.38   c3.16-12.25,6.33-24.5,9.49-36.76C117.91,47.13,117.13,45.17,115.77,43.77z"
                />
                <path
                  d="M14.48,77.81c2.9-14.41,5.59-27.75,8.28-41.09c0.03-0.16,0.13-0.32,0.13-0.48c-0.11-14.11,9.73-19.14,20.92-22.91
     c8.65-2.91,17.51-5.33,25.93-8.8c5.76-2.38,10.19-1.05,14.03,2.83c12.16,12.29,24.18,24.72,36.01,37.32
     c1.32,1.4,1.93,4.46,1.46,6.4c-3.69,15.33-7.58,30.63-11.82,45.82c-0.59,2.11-3.17,4.57-5.33,5.21
     c-14.8,4.41-29.71,8.49-44.67,12.36c-1.71,0.44-4.3-0.62-5.87-1.8c-11.41-8.61-22.82-17.25-33.87-26.31
     C17.19,84.32,16.09,80.56,14.48,77.81z M21.99,76.58c0.76,1.49,1.14,3.48,2.34,4.42c10.61,8.28,21.32,16.43,32.12,24.46
     c1.08,0.8,3.11,0.99,4.5,0.64c12.4-3.14,24.73-6.56,37.13-9.66c3.44-0.86,5.36-2.48,6.21-6c3.01-12.6,6.36-25.12,9.29-37.74
     c0.4-1.71-0.24-4.37-1.42-5.64C101.37,35.52,90.4,24.17,79.33,12.92c-1.06-1.08-3.41-1.97-4.71-1.55
     c-11.08,3.51-22.02,7.46-33.08,11.02c-7.29,2.35-10.81,6.63-11.84,14.67C28.01,50.19,24.7,63.12,21.99,76.58z"
                />
                <path
                  d="M104.52,62.65C104.6,81.8,86.3,96.73,70.28,97.17c-19.8,0.55-38.56-15.56-38.91-32.68
     c-0.56-27.62,15.92-41.47,37.87-42.34C88.77,21.39,103.94,35.38,104.52,62.65z M37.51,61.49c-2.72,15.16,17.04,29.9,31.73,29.63
     c13.92-0.26,29.11-13.66,28.81-27.25c-0.49-22.36-8.82-35.15-28.52-35.58C53.18,27.93,38.15,37.1,37.51,61.49z"
                />
                <path
                  fill="#ffffff"
                  d="M66.6,32.19c-13.29-0.13-24.39,10.22-24.04,23.4C43,71.85,50.07,84.89,65.1,84.89
     c17.1,0.01,28.63-9.4,28.74-23.7C93.97,43.65,83.36,32.36,66.6,32.19z"
                />
                <path
                  d="M66.6,32.19c16.76,0.17,27.37,11.46,27.24,29C93.73,75.49,82.2,84.9,65.1,84.89C50.07,84.89,43,71.85,42.56,55.59
     C42.21,42.41,53.31,32.06,66.6,32.19z"
                />
              </g>
            </svg>
          </div>
          <div className={styles.inner}>
            <svg
              className={clsx({ [styles.anim]: applyAnim })}
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="14.47 3.34 106.91 111.22"
            >
              <defs>
                <pattern
                  id="credit"
                  x="0"
                  y="0"
                  patternUnits="objectBoundingBox"
                  preserveAspectRatio="xMidYMid meet"
                  height="1"
                  width="1"
                >
                  <image
                    x="-10"
                    y="4"
                    height="44"
                    xlinkHref={`assets/credit.png`}
                  ></image>
                </pattern>
                <filter id="squiggly-0">
                  <feTurbulence
                    id="turbulence"
                    baseFrequency="0.02"
                    numOctaves="3"
                    result="noise"
                    seed="0"
                  />
                  <feDisplacementMap
                    id="displacement"
                    in="SourceGraphic"
                    in2="noise"
                    scale="1"
                  />
                </filter>
                <filter id="squiggly-1">
                  <feTurbulence
                    id="turbulence"
                    baseFrequency="0.02"
                    numOctaves="3"
                    result="noise"
                    seed="1"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="1.1"
                  />
                </filter>

                <filter id="squiggly-2">
                  <feTurbulence
                    id="turbulence"
                    baseFrequency="0.02"
                    numOctaves="3"
                    result="noise"
                    seed="2"
                  />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" />
                </filter>
                <filter id="squiggly-3">
                  <feTurbulence
                    id="turbulence"
                    baseFrequency="0.02"
                    numOctaves="3"
                    result="noise"
                    seed="3"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="1.1"
                  />
                </filter>

                <filter id="squiggly-4">
                  <feTurbulence
                    id="turbulence"
                    baseFrequency="0.02"
                    numOctaves="3"
                    result="noise"
                    seed="4"
                  />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" />
                </filter>
              </defs>
              <g>
                <path
                  fill="url(#credit)"
                  d="M66.6,32.19c16.76,0.17,27.37,11.46,27.24,29C93.73,75.49,82.2,84.9,65.1,84.89C50.07,84.89,43,71.85,42.56,55.59
      C42.21,42.41,53.31,32.06,66.6,32.19z"
                />
              </g>
            </svg>
          </div>
        </div>
      </CSSTransition>
    </>
  )
}

export default Credit
