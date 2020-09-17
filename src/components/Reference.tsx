import React, { useState, useCallback } from 'react'

import styles from './Popup.module.scss'
import { CSSTransition } from 'react-transition-group'
import clsx from 'clsx'

interface ReferenceProps {
  show: boolean
  onClose: () => void
}

const Reference: React.FC<ReferenceProps> = ({ show, onClose }) => {
  const [applyAnim, setApplyAnim] = useState(false)
  const [page, setPage] = useState(0)
  const handlePaging = useCallback(
    (nextPage: number) => {
      if (page === nextPage) {
        return
      }

      setPage(nextPage)
    },
    [page]
  )

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
              viewBox="45.99 4.16 111.15 102.12"
            >
              <g>
                <path
                  fill="#D2D2D2"
                  d="M148.85,49.57c-0.22-3.01-1.14-5.94-2.72-8.53c-0.13-0.41-0.31-0.82-0.56-1.21c-1.35-2.12-2.86-3.98-4.76-5.62
		c-0.04-0.03-0.08-0.06-0.11-0.09c-0.86-1-1.76-1.96-2.7-2.89c-1.95-3.61-4.12-7.08-6.48-10.45c-2.5-3.57-5.19-8.64-8.83-11.17
		c-3.63-2.53-8.86-1.94-13.03-1.62c-5.26,0.4-10.45,1.35-15.52,2.81c-0.92,0.26-1.67,0.72-2.29,1.29c-2.24,0.51-4.46,1.12-6.66,1.86
		c-0.96,0-1.91,0-2.87,0.01c-1.85,0.03-3.31,0.75-4.3,1.86c-6.51,1.08-12.24,5.85-10.76,13.09c0.12,0.57,0.34,1.06,0.62,1.51
		c-2.24,1.49-4.04,4.11-5.26,7.15c-0.84,0.47-1.59,1.2-2.13,2.23c-0.6,1.16-1.36,2.43-2.11,3.77c-1.31,0.64-2.44,1.76-3.11,3.44
		c-0.59,1.48-1.18,2.95-1.77,4.43c-0.01,0.02-0.03,0.04-0.05,0.06c-0.62,0.94-0.92,1.85-1.11,2.83c0,0.01-0.01,0.02-0.01,0.04
		c0,0,0.01,0,0.01,0c-0.09,0.51-0.16,1.03-0.22,1.59c-0.17,1.53,0.16,2.73,0.8,3.64c0.58,3.84,2.1,7.7,5.26,9.74
		c0.22,0.14,0.44,0.26,0.66,0.37c2.95,8.75,6.45,17.29,10.49,25.6c1.2,2.47,3.88,3.24,6.32,2.75c1.97,1.28,4.32,0.93,6.12-0.32
		c2.5,0.1,4.98,0.3,7.47,0.6c1.33,0.16,2.45-0.18,3.35-0.82c1.25,0.07,2.5,0.16,3.75,0.28c0.56,0.43,1.22,0.79,2.01,1.04
		c0.97,0.32,1.95,0.6,2.93,0.86c0.58,0.42,1.29,0.75,2.12,0.92c12.6,2.69,26.02,3.5,34.39-8.11c7.49-10.38,12.27-23.4,15.31-35.73
		C153.95,53.23,151.85,50.41,148.85,49.57z M84.35,52.02c1.14-2.02,2-4.76,2.24-7.53c3.55,0.55,7.35-0.45,10.46-2.37
		c4.28,0.73,8.56,1.46,12.84,2.19c2.19,3.1,6.54,5.3,9.84,6.43c1.48,0.51,2.99,0.94,4.52,1.33c-0.05,1.49-0.01,3.01,0.17,4.46
		c-6.74,4.99-11.72,11.71-14.99,19.62c-1.38,1.79-2.27,3.64-2.32,5.43c-4.62-1.95-9.33-3.7-14.11-5.24
		c-1.66-0.93-3.37-1.8-5.13-2.59c-1.94-0.87-4.05-1.83-6.15-2.35c0.48-4.94-0.14-9.82-1.78-14.54
		C81.72,55.61,83.29,53.89,84.35,52.02z"
                />
                <path
                  d="M115.9,106.29c-13.28-0.8-26.58-1.45-39.84-2.56c-2.27-0.19-5.28-1.85-6.4-3.74c-7.89-13.3-15.54-26.75-22.81-40.39
			c-1.18-2.21-1.13-6.2,0.1-8.38c7.5-13.34,15.41-26.45,23.45-39.47c0.95-1.53,3.51-2.66,5.45-2.89c14.2-1.68,28.44-3.03,42.66-4.62
			c5.23-0.58,8.61,2.06,11.22,5.98c7.08,10.66,14.03,21.41,21.03,32.13c0.09,0.14,0.13,0.32,0.24,0.43
			c9.75,10.14,6.3,20.58,0.72,31.08c-4.29,8.08-8.94,16-12.64,24.35c-2.44,5.49-6.34,7.34-11.67,7.52 M126.59,98.53
			c1.79-0.24,4.1-1.56,4.95-3.07c5.04-9,9.94-18.1,14.47-27.37c5.63-11.52,5.45-11.61-1.47-22.26c-0.72-1.12-1.41-2.26-2.13-3.38
			c-6.1-9.32-12.08-18.73-18.43-27.88c-1.08-1.56-3.82-3.03-5.65-2.87c-13.09,1.17-26.15,2.71-39.19,4.33
			c-1.38,0.17-3.07,1.32-3.82,2.51c-6.97,11.15-13.7,22.45-20.66,33.61c-1.63,2.61-1.58,4.8-0.1,7.37
			c6.55,11.4,12.91,22.91,19.61,34.22c0.9,1.52,3.26,2.91,5.04,3.05c12.11,0.95,24.25,1.55,36.38,2.26"
                />
                <path
                  d="M103.82,20.28c21.27-1.54,36.31,21.88,35.23,37.8c-1.4,20.51-13.98,36.66-35.82,36.68
			c-16.98,0.02-39.35-17.07-38.42-38.42C65.75,34.78,81.55,19.78,103.82,20.28z M104.36,26.33C85.95,25.73,72,37.86,71.28,55.1
			c-0.69,16.43,14.88,33.21,31.79,33.2c18.31-0.01,27.99-11.62,29.94-29.72C134.7,42.85,119.66,26.83,104.36,26.33z"
                />
              </g>
            </svg>
          </div>
          <div className={styles.inner}>
            <svg
              className={clsx({ [styles.anim]: applyAnim })}
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="45.99 4.16 111.15 102.12"
            >
              <defs>
                <pattern
                  id="reference1"
                  x="0"
                  y="0"
                  patternUnits="objectBoundingBox"
                  preserveAspectRatio="xMidYMid meet"
                  height="1"
                  width="1"
                >
                  <image
                    x="-8"
                    y="5"
                    height="42"
                    xlinkHref={`assets/reference1.png`}
                  ></image>
                </pattern>
                <pattern
                  id="reference2"
                  x="0"
                  y="0"
                  patternUnits="objectBoundingBox"
                  preserveAspectRatio="xMidYMid meet"
                  height="1"
                  width="1"
                >
                  <image
                    x="-8"
                    y="5"
                    height="42"
                    xlinkHref={`assets/reference2.png`}
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
                  d="M129.89,58.85c0,14.13-12.32,25.18-27.98,25.09c-12.18-0.07-25.59-13.06-25.67-24.88c-0.1-13.89,12.47-28.24,24.59-28.1
			C115.13,31.14,129.89,45.31,129.89,58.85z"
                />
                <path
                  fill={`url(#reference${page + 1})`}
                  d="M129.89,58.85c0,14.13-12.32,25.18-27.98,25.09c-12.18-0.07-25.59-13.06-25.67-24.88c-0.1-13.89,12.47-28.24,24.59-28.1
			C115.13,31.14,129.89,45.31,129.89,58.85z"
                />
              </g>
              <g
                className={styles.pagingButton}
                onClick={(e) => {
                  e.stopPropagation()
                  handlePaging(0)
                }}
              >
                <circle cx="100" cy="79" r="0.7"></circle>
                <circle
                  className={styles.indicator}
                  cx="101"
                  cy="80"
                  r="0.7"
                ></circle>
              </g>
              <g
                className={styles.pagingButton}
                onClick={(e) => {
                  e.stopPropagation()
                  handlePaging(1)
                }}
              >
                <circle cx="104" cy="79" r="0.7"></circle>
                <circle
                  className={styles.indicator}
                  cx="105"
                  cy="80"
                  r="0.7"
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePaging(1)
                  }}
                ></circle>
              </g>
            </svg>
          </div>
        </div>
      </CSSTransition>
    </>
  )
}

export default Reference
