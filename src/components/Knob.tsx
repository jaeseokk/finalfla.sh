import React, { useState, useCallback, useMemo, useRef } from 'react'
import clsx from 'clsx'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import styles from './Knob.module.scss'
import { sequenceUnits } from '../shared/config'
import ExpandedKnob, { Overlay } from './ExpandedKnob'
import useLongPress from '../shared/useLongPress'
import { Category, MATERIALS_OFFSET } from '../shared/constants'

interface KnobProp {
  category: Category
  selectedIndex: number
  playing: boolean
  muted: boolean
  onSelect: (index: number) => void
}

const ExpandedKnobPortal = ({ children }: any) => {
  const expandedContainerEl = document.getElementById('expanded-knob')

  if (expandedContainerEl) {
    return createPortal(children, expandedContainerEl)
  }

  return null
}

const Knob: React.FC<KnobProp> = ({
  category,
  selectedIndex,
  playing,
  muted,
  onSelect,
}) => {
  const touchMoving = useRef(false)
  const offset = MATERIALS_OFFSET[category]
  const materials = useMemo(
    () => sequenceUnits.filter((unit) => unit.category === category),
    [category]
  )
  const rotateDeg = useMemo(() => {
    return selectedIndex < 0
      ? 0
      : (360 / (materials.length + 1)) * (selectedIndex - offset + 1)
  }, [selectedIndex, materials])
  const id = selectedIndex < 0 ? null : sequenceUnits[selectedIndex].id
  const patternId = id ? `icon-${id}` : undefined
  const fill = patternId ? `url(#${patternId})` : '#fff'
  const [expand, setExpand] = useState(false)
  const handleLongPress = useCallback((e) => {
    setExpand(true)
  }, [])
  const handleClick = useCallback(() => {
    const nextSelectedIndex = selectedIndex === -1 ? offset : selectedIndex + 1

    if (materials.length <= nextSelectedIndex - offset) {
      onSelect(-1)
      return
    }

    onSelect(nextSelectedIndex)
  }, [onSelect, selectedIndex])
  const { startInteracting, clearInteracting } = useLongPress(
    handleLongPress,
    handleClick
  )
  const handleMouseDown = useCallback(
    (e) => {
      startInteracting(e)
    },
    [startInteracting]
  )
  const handleMouseUp = useCallback(
    (e) => {
      clearInteracting(e)
    },
    [clearInteracting]
  )
  const handleTouchStart = useCallback(
    (e) => {
      touchMoving.current = false
      startInteracting(e)
    },
    [startInteracting]
  )
  const handleTouchEnd = useCallback(
    (e) => {
      e.cancelable && e.preventDefault()
      if (touchMoving.current) {
        clearInteracting()
      } else {
        clearInteracting(e)
      }
    },
    [clearInteracting]
  )
  const handleTouchMove = useCallback((e) => {
    touchMoving.current = true
    clearInteracting()
  }, [])
  const handleSelect = useCallback(
    (index: number) => {
      clearInteracting()
      setExpand(false)
      onSelect(index)
    },
    [onSelect]
  )

  return (
    <div className={styles.Knob}>
      <div
        className={styles.normalKnob}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108.65 109.4">
          <defs>
            <pattern
              id={patternId}
              x="0"
              y="0"
              patternUnits="objectBoundingBox"
              preserveAspectRatio="xMidYMid meet"
              height="1"
              width="1"
            >
              {id && (
                <image
                  x="0"
                  y="0"
                  height="80"
                  xlinkHref={`assets/icons/${id}.png`}
                ></image>
              )}
            </pattern>
          </defs>
          <path
            d="M88.62,34.47A41.9,41.9,0,0,0,71.11,18a38.14,38.14,0,0,0-11.79-3.62,54.82,54.82,0,0,0-14.7-.09,17.8,17.8,0,0,0-6.17,1.95,2,2,0,0,0-.54.43A37.28,37.28,0,0,0,22.79,29.43a50.12,50.12,0,0,0-9.37,24.21,39.86,39.86,0,0,0,5.76,24.11A40.41,40.41,0,0,0,38,93.75,43.34,43.34,0,0,0,64.12,96a57.86,57.86,0,0,0,13.35-4.75,29.65,29.65,0,0,0,10.19-7.92c5.28-6.62,7.21-15.25,7.35-23.5A49.12,49.12,0,0,0,88.62,34.47Z"
            fill={fill}
          />
          <g
            className={styles.rotateWrapper}
            style={{
              transform: `rotate(${rotateDeg}deg)`,
            }}
          >
            <path
              d="M93.82,80.79A28.09,28.09,0,0,1,85.57,91a50.16,50.16,0,0,1-13.25,6.73c-9.3,3.3-19.26,4.36-28.87,1.76A44.4,44.4,0,0,1,21,85.12a44.11,44.11,0,0,1-9.81-25c-.63-9.79,2.26-19.39,6.92-27.93C22.09,24.83,27.7,18,35.21,14A28,28,0,0,1,39,12.31l1,5.28a46.25,46.25,0,0,0,1.35,6.6,21.8,21.8,0,0,0-2.57,1.16c-5.58,3-9.52,8.33-11.71,14.16-2.54,6.76-2.65,14.35-1.74,21.43.88,6.79,3,13.33,7.75,18.44a27.14,27.14,0,0,0,16,8.4,45.14,45.14,0,0,0,11.26,0,27.82,27.82,0,0,0,10.36-3C82.69,78.21,87.38,62.87,85,50A40.7,40.7,0,0,0,74.86,30,22.41,22.41,0,0,0,67,24.5a1.76,1.76,0,0,0,.1-.3q1.11-5.57,2.23-11.14a44.48,44.48,0,0,1,18.33,14.1A52,52,0,0,1,97.81,53.71C98.68,62.73,97.87,72.54,93.82,80.79Z"
              fill="#5b5b5b"
            />
            <path d="M95.52,30A50.21,50.21,0,0,0,74.73,10a44.55,44.55,0,0,0-14-4.4,64.14,64.14,0,0,0-17.45-.11A21,21,0,0,0,36,7.89a2.48,2.48,0,0,0-.65.52C28,11.66,22,17.31,17.36,23.87A61.5,61.5,0,0,0,6.24,53.25a49.24,49.24,0,0,0,6.83,29.26,48.25,48.25,0,0,0,22.29,19.42,50.38,50.38,0,0,0,31.07,2.74A67.62,67.62,0,0,0,82.28,98.9a35.35,35.35,0,0,0,12.11-9.61c6.26-8,8.56-18.51,8.72-28.53A60.59,60.59,0,0,0,95.52,30ZM52.78,10.07a49.61,49.61,0,0,1,11.8,1.41L62.3,22.86c0,.11,0,.23,0,.35-.54-.08-1.08-.15-1.62-.2a2.89,2.89,0,0,0-1.21-.36,56.43,56.43,0,0,0-13.31.23,48.25,48.25,0,0,1-1.36-6.64l-1-5.79A52.18,52.18,0,0,1,52.78,10.07Zm-1.46,17.3.45,10.86a2.56,2.56,0,0,0,.24,1.9l.14.25c1.2,2.11,4.76,1.24,4.66-1.26-.16-3.72-.31-7.43-.47-11.15,5.06-.25,10,.78,13.83,4.43a34.67,34.67,0,0,1,8.88,14.46c3.48,10.85,1.25,23.71-7.64,31.37-4.76,4.1-11,4.84-17.09,4.89a23.5,23.5,0,0,1-15-4.72c-4.58-3.57-7.22-8.62-8.45-14.22a45.7,45.7,0,0,1-.4-18.56c1.21-5.95,4.22-11.85,9.46-15.2A22,22,0,0,1,51.32,27.37ZM93.83,80.79A28.09,28.09,0,0,1,85.58,91a50.16,50.16,0,0,1-13.25,6.73c-9.3,3.3-19.26,4.36-28.87,1.76A44.4,44.4,0,0,1,21,85.12a44.11,44.11,0,0,1-9.81-25c-.63-9.79,2.26-19.39,6.92-27.93C22.1,24.83,27.71,18,35.22,14A28,28,0,0,1,39,12.31l1,5.28a46.25,46.25,0,0,0,1.35,6.6,21.8,21.8,0,0,0-2.57,1.16c-5.58,3-9.52,8.33-11.71,14.16-2.54,6.76-2.65,14.35-1.74,21.43.88,6.79,3,13.33,7.75,18.44a27.14,27.14,0,0,0,16,8.4,45.14,45.14,0,0,0,11.26,0,27.82,27.82,0,0,0,10.36-3C82.7,78.21,87.39,62.87,85,50A40.7,40.7,0,0,0,74.87,30,22.41,22.41,0,0,0,67,24.5a1.76,1.76,0,0,0,.1-.3q1.11-5.57,2.23-11.14a44.48,44.48,0,0,1,18.33,14.1A52,52,0,0,1,97.82,53.71C98.69,62.73,97.88,72.54,93.83,80.79Z" />
            <g className={styles.lightWrapper}>
              <path
                className={clsx([
                  styles[category],
                  { [styles.selected]: selectedIndex > -1 && !muted },
                ])}
                d="M52.78,10.07a49.61,49.61,0,0,1,11.8,1.41L62.3,22.86c0,.11,0,.23,0,.35-.54-.08-1.08-.15-1.62-.2a2.89,2.89,0,0,0-1.21-.36,56.43,56.43,0,0,0-13.31.23,48.25,48.25,0,0,1-1.36-6.64l-1-5.79A52.18,52.18,0,0,1,52.78,10.07Z"
              />
            </g>
          </g>
        </svg>
      </div>
      <div className={clsx([styles.led, { [styles.playing]: playing }])}></div>

      <ExpandedKnobPortal>
        <CSSTransition
          in={expand}
          classNames="popupOverlayTransition"
          timeout={300}
          unmountOnExit
        >
          <Overlay />
        </CSSTransition>
        <CSSTransition
          in={expand}
          classNames="popupTransition"
          timeout={300}
          unmountOnExit
        >
          <ExpandedKnob
            materials={materials}
            offset={offset}
            category={category}
            selectedIndex={selectedIndex}
            onSelect={handleSelect}
          />
        </CSSTransition>
      </ExpandedKnobPortal>
    </div>
  )
}

export default React.memo(Knob)
