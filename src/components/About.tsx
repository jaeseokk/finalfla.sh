import React, { useState, useCallback, useEffect } from 'react'

import styles from './Popup.module.scss'
import { CSSTransition } from 'react-transition-group'
import clsx from 'clsx'

interface AboutProps {
  show: boolean
  onClose: () => void
}

interface IndecatorsProps {
  page: number
  onPaging: (page: number) => void
}

const Indicators: React.FC<IndecatorsProps> = ({ page, onPaging }) => {
  return (
    <>
      {[0, 1, 2, 3].map((i) => {
        const cx = i * 3 + 52
        return (
          <g
            className={clsx([
              styles.pagingButton,
              {
                [styles.selected]: page === i,
              },
            ])}
            onClick={(e) => {
              e.stopPropagation()
              onPaging(i)
            }}
          >
            <circle fill="transparent" cx={cx} cy="76" r="3"></circle>
            <circle
              className={styles.indicator}
              cx={cx}
              cy="76"
              r="0.7"
            ></circle>
          </g>
        )
      })}
    </>
  )
}

const About: React.FC<AboutProps> = ({ show, onClose }) => {
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
  useEffect(() => {
    if (!show) {
      setPage(0)
    }
  }, [show])

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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 111.16 102.13">
              <path d="M69.9,102.13c-13.28-.8-26.58-1.45-39.84-2.56a9.33,9.33,0,0,1-6.4-3.74C15.77,82.53,8.12,69.08.85,55.44A10.17,10.17,0,0,1,1,47.06C8.45,33.72,16.36,20.61,24.4,7.59c1-1.53,3.51-2.66,5.45-2.89C44.05,3,58.29,1.67,72.51.08c5.23-.58,8.61,2.06,11.22,6,7.08,10.66,14,21.41,21,32.13a2.52,2.52,0,0,0,.24.43c9.75,10.14,6.3,20.58.72,31.08-4.29,8.08-8.94,16-12.64,24.35-2.44,5.49-6.34,7.34-11.67,7.52m-.82-7.2a7.48,7.48,0,0,0,5-3.07c5-9,9.94-18.1,14.47-27.37,5.63-11.52,5.45-11.61-1.47-22.26-.72-1.12-1.41-2.26-2.13-3.38C90.31,29,84.33,19.56,78,10.41a7.5,7.5,0,0,0-5.65-2.87c-13.09,1.17-26.15,2.71-39.19,4.33a6,6,0,0,0-3.82,2.51C22.35,25.53,15.62,36.83,8.66,48a6.41,6.41,0,0,0-.1,7.37c6.55,11.4,12.91,22.91,19.61,34.22a7.38,7.38,0,0,0,5,3c12.11,1,24.25,1.55,36.38,2.26" />
              <path
                d="M80.59,94.37a7.48,7.48,0,0,0,5-3.07c5-9,9.94-18.1,14.47-27.37,5.63-11.52,5.45-11.61-1.47-22.26-.72-1.12-1.41-2.26-2.13-3.38C90.31,29,84.33,19.56,78,10.41a7.5,7.5,0,0,0-5.65-2.87c-13.09,1.17-26.15,2.71-39.19,4.33a6,6,0,0,0-3.82,2.51C22.35,25.53,15.62,36.83,8.66,48a6.41,6.41,0,0,0-.1,7.37c6.55,11.4,12.91,22.91,19.61,34.22a7.38,7.38,0,0,0,5,3c12.11,1,24.25,1.55,36.38,2.26"
                fill="#d2d2d2"
              />
              <path d="M57.82,16.12C79.09,14.58,94.13,38,93.05,53.92c-1.4,20.51-14,36.66-35.82,36.68-17,0-39.35-17.07-38.42-38.42C19.75,30.62,35.55,15.62,57.82,16.12Zm.54,6.05C40,21.57,26,33.7,25.28,50.94c-.69,16.43,14.88,33.21,31.79,33.2,18.31,0,28-11.62,29.94-29.72C88.7,38.69,73.66,22.67,58.36,22.17Z" />
              <path d="M83.89,54.69c0,14.13-12.32,25.18-28,25.09C43.73,79.71,30.32,66.72,30.24,54.9,30.14,41,42.71,26.66,54.83,26.8,69.13,27,83.89,41.15,83.89,54.69Z" />
            </svg>
          </div>
          <div className={styles.inner}>
            <svg
              className={clsx({ [styles.anim]: applyAnim })}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 111.16 102.13"
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
                  <text
                    className={styles.aboutText}
                    transform="matrix(0.9 0 0 0.9 21.4 2.7)"
                    fill="#ffffff"
                  >
                    <tspan className={styles.title} x="-2" y="1.9">
                      ABOUT
                    </tspan>
                    <tspan x="-11.4" y="5.8">
                      This is a 6-track video &amp; music
                    </tspan>
                    <tspan x="-13.1" y="7.7">
                      sequencer accessible to anyone on
                    </tspan>
                    <tspan x="-13.9" y="9.6">
                      the Web. Collaboratively created by
                    </tspan>
                    <tspan x="-16.8" y="11.5">
                      HaeKang Lee, JiSu Han, and ChunChu Kim, this
                    </tspan>
                    <tspan x="-16.4" y="13.4">
                      sequencer proposes a new channel of album
                    </tspan>
                    <tspan x="-18.1" y="15.4">
                      distribution, allowing users to deconstruct the
                    </tspan>
                    <tspan x="-18.2" y="17.3">
                      provided multimedia and to create something of
                    </tspan>
                    <tspan x="-2.3" y="19.2">
                      their own.
                    </tspan>
                    <tspan x="-20.1" y="23">
                      The idea comes from Andy Warhol’s album cover work
                    </tspan>
                    <tspan x="-20.7" y="25">
                      for the Velvet Underground’s album released on vinyl,
                    </tspan>
                    <tspan x="-20.6" y="26.9">
                      the era’s most contemporary medium. The idea inspired
                    </tspan>
                    <tspan x="-20.7" y="28.8">
                      visual artist Lee HaeKang to produce the single album
                    </tspan>
                    <tspan x="-18.4" y="30.7">
                      for musical artists Kim ChunChu and Han JiSu for
                    </tspan>
                    <tspan x="-18.9" y="32.6">
                      release on the current generation’s medium of the
                    </tspan>
                    <tspan x="-17" y="34.6">
                      Internet, as an interactive online instrument.
                    </tspan>
                    <tspan x="-17.1" y="38.4">
                      Visitors can access the album’s music and video
                    </tspan>
                    <tspan x="-17" y="40.3">
                      clips via the open-source webpage and produce
                    </tspan>
                    <tspan x="-15.4" y="42.2">
                      their own unique sequence and playback to
                    </tspan>
                    <tspan x="-7.5" y="44.2">
                      convey a new narrative.
                    </tspan>
                    <tspan x="-11.1" y="46.1">
                      (*Final Flash is best experienced
                    </tspan>
                    <tspan x="-6.6" y="48">
                      on the Google Chrome
                    </tspan>
                    <tspan x="-5.2" y="49.9">
                      internet browser)
                    </tspan>
                  </text>
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
                    x="-9"
                    y="4"
                    height="44"
                    xlinkHref={`assets/credit.png`}
                  ></image>
                </pattern>
                <pattern
                  id="reference3"
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
                  id="reference4"
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
              <path
                fill={`url(#reference${page + 1})`}
                d="M83.89,54.69c0,14.13-12.32,25.18-28,25.09C43.73,79.71,30.32,66.72,30.24,54.9,30.14,41,42.71,26.66,54.83,26.8,69.13,27,83.89,41.15,83.89,54.69Z"
              />
              <Indicators page={page} onPaging={handlePaging} />
            </svg>
          </div>
        </div>
      </CSSTransition>
    </>
  )
}

export default About
