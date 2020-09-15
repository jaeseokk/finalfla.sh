import React, { useState, useCallback, useMemo } from 'react'
import clsx from 'clsx'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import styles from './Knob.module.scss'
import { animationUnits } from '../shared/animation-config'
import ExpandedKnob, { Overlay } from './ExpandedKnob'
import useLongPress from '../shared/useLongPress'
import { AnimCategory, MATERIALS_OFFSET } from '../shared/constants'

interface KnobProp {
  category: AnimCategory
  selectedIndex: number
  playing: boolean
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
  onSelect,
}) => {
  const offset = MATERIALS_OFFSET[category]
  const materials = useMemo(
    () => animationUnits.filter((unit) => unit.category === category),
    [category]
  )
  const rotateDeg = useMemo(() => {
    return selectedIndex < 0
      ? 0
      : (360 / (materials.length + 1)) * (selectedIndex - offset + 1)
  }, [selectedIndex, materials])
  const id = selectedIndex < 0 ? null : animationUnits[selectedIndex].id
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
      >
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 108.65 109.4"
        >
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
                  height="60"
                  xlinkHref={`assets/icons/${id}.png`}
                ></image>
              )}
            </pattern>
          </defs>
          <g>
            <path
              fill={fill}
              d="M83.16,61.95c0.04-1.69-0.57-3.15-1.54-4.29c0.33-1.43,0.57-2.96,0.79-4.6c-0.03,0-0.06-0.01-0.09-0.01
		c0.14-0.6,0.26-1.21,0.34-1.85c0.27-2.15-0.59-3.85-1.99-5.02c0.03-0.55,0.03-1.12,0-1.72c-0.17-2.84-2.04-5.4-4.49-6.52
		c-0.24-0.82-0.61-1.68-1.14-2.56c-8.49-14.06-34.94-12.75-43.06,0.8c-0.56,0.93-0.87,1.84-0.98,2.72
		c-1.76,1.89-2.54,4.85-1.61,7.26c-2.9,2.03-4.45,6.26-2.34,9.44c0.35,0.53,0.73,1.02,1.12,1.51c-1.35,2.36-1.36,5.56,0.9,8.39
		c0.49,0.61,1.02,1.15,1.59,1.63c-0.16,1.29,0.01,2.69,0.64,4.14c0.72,1.64,1.67,2.97,2.8,4.06c2.01,2.66,4.34,5.07,7.29,6.7
		c5.18,2.85,11.9,2.77,17.65,2.53c10.49-0.43,16.15-6.02,20.13-14.42c0.24-0.29,0.47-0.6,0.7-0.9
		C81.83,67.47,83.09,65.11,83.16,61.95z"
            />
          </g>
          <g
            className={styles.wrapper}
            style={{
              transform: `rotate(${rotateDeg}deg)`,
            }}
          >
            <g>
              <path
                fill="#ffffff"
                d="M66.18,11.38c-1.61-2.76-5.97-3.15-8.79-3.43c-3.78-0.38-7.59,0.02-11.36,0.28c-2.91,0.2-5.13,3.28-3.45,6.02
		c0.58,0.94,0.74,1.42,0.75,2.52c0,1.02,0.42,1.96,1.08,2.69c-0.71,2.4,0.48,5.27,3.61,4.94c0.44-0.05,0.88-0.09,1.31-0.13
		c2.06,0.38,4.86,0.61,7-0.13c1.61,0.14,3.26,0.36,4.8,0.09c3.4-0.6,4.34-4.28,3.99-7.32C66.7,15.6,67.47,13.58,66.18,11.38z"
              />
            </g>
            <g>
              <path
                fill="#5B5B5B"
                d="M94.57,35.22c-2.19-4.46-5.08-8.63-8.4-12.32c-2.33-2.59-5.19-6.09-8.69-6.77c-1.09-1.09-2.19-2.18-3.31-3.25
		c-2.7-2.57-6.46-0.53-6.83,2.83c-0.29,2.61-0.91,5.05-1.73,7.54c-0.62,1.87,0.72,4.61,2.79,4.92c8.93,1.32,11.86,12.35,13.22,19.9
		c0.74,4.15,2,9.45,1.69,13.67c-0.27,3.62-2.55,6.51-2.48,10.27c0,0.02,0.01,0.04,0.01,0.06c-3.46,3.98-7.39,7.53-11.71,10.59
		c-0.26,0.19-0.48,0.39-0.68,0.6c-1.59,0.7-3.27,1.27-5.06,1.69c-2.73,0.28-5.46,0.56-8.19,0.85c-0.58,0.06-1.09,0.22-1.54,0.45
		c-0.42-0.37-0.95-0.65-1.62-0.75c-2.57-0.41-5.15-0.83-7.72-1.24c-1.13-0.18-2.2,0.15-3.08,0.74c-1.52-1.13-3.01-2.28-4.48-3.46
		c-0.07-0.09-0.15-0.18-0.22-0.26c-2.64-3.32-4.86-6.86-6.78-10.67c-0.41-0.8-0.99-1.33-1.66-1.63c-0.24-0.51-0.48-1.02-0.72-1.52
		c0.41-0.76,0.62-1.66,0.47-2.69c-1.17-8.14-0.85-16.31,0.82-24.35c0.11-0.54,0.11-1.04,0.05-1.5c0.2-0.51,0.38-1.02,0.53-1.55
		c0.78-1.04,1.37-2.26,1.77-3.55c0.85-0.77,1.55-1.65,2.11-2.61c1.21-0.64,2.09-1.68,2.66-2.93c0.08-0.06,0.15-0.12,0.22-0.19
		c2.03,0.79,4.74-0.46,5.49-2.67c0.15-0.45,0.25-0.84,0.31-1.22c0.42-0.82,0.61-1.74,0.46-2.63c-0.2-1.18-0.4-2.36-0.6-3.53
		c-0.05-0.3-0.14-0.56-0.24-0.81c-0.2-0.95-0.42-1.89-0.7-2.83c-0.4-1.33-1.41-2.17-2.57-2.55c-2.29-0.94-5.3,0.18-5.51,3.19
		c-1.64,0.17-3.3,1.34-3.9,2.91c-0.01,0.02-0.01,0.03-0.02,0.05c-1.05,0.02-2.11,0.42-2.89,1.14c-0.97,0.55-1.8,1.43-2.37,2.53
		c-0.26,0.49-0.46,1-0.62,1.51c-1.19,0-2.34,0.59-3.06,2.05c-1.37,2.77-2.65,5.58-3.87,8.41c-0.17,0.25-0.33,0.53-0.46,0.84
		c-2.99,7.26-5.6,14.44-5.88,22.37c-0.02,0.48,0.06,0.91,0.2,1.31c0.15,1.17,0.31,2.33,0.48,3.49c-0.2,0.5-0.31,1.1-0.26,1.8
		c0.22,3.17,0.95,6.01,2.4,8.73c0.56,1.99,1.37,3.84,2.44,5.6c1.59,3.59,3.85,6.7,6.95,9.26c0.08,0.26,0.21,0.52,0.37,0.77
		c-0.04,0.96,0.29,1.98,1.16,2.89c3.77,3.93,8.12,6.63,13.23,8.46c0.62,0.22,1.24,0.23,1.82,0.1c0.64,1.24,1.91,2.12,3.51,2.19
		c0.13,0.01,0.27,0.01,0.4,0.01c0.03,0.01,0.05,0.02,0.08,0.03c3.73,1.1,9.24,2.58,12.82,0.47c0.08,0.01,0.16,0.03,0.24,0.03
		c2.32,0.09,4.56-0.14,6.75-0.59c1.02-0.09,2.05-0.18,3.07-0.27c1.26-0.11,2.2-0.68,2.84-1.47c0.04-0.01,0.08-0.03,0.11-0.04
		c0.87,0.73,2.06,1.06,3.45,0.62c1.48-0.47,2.9-1.02,4.27-1.66c0.06-0.03,0.12-0.04,0.18-0.07c0.28-0.14,0.54-0.29,0.81-0.43
		c0.37-0.19,0.75-0.38,1.11-0.59c5.98-3.26,10.95-7.33,14.6-13.33c3.4-5.59,7.74-14.18,7.07-20.94
		C101.19,53.68,98.79,43.79,94.57,35.22z"
              />
              <path
                d="M95.52,29.98c-4.8-8.44-12.1-15.58-20.79-19.95c-4.41-2.22-9.11-3.73-14-4.4c-5.69-0.78-11.75-0.92-17.45-0.11
		c-2.58,0.36-5.04,1.11-7.32,2.37c-0.27,0.15-0.48,0.33-0.65,0.52c-7.33,3.25-13.32,8.9-17.95,15.46
		C11.35,32.42,7.15,42.81,6.24,53.25c-0.89,10.11,1.62,20.56,6.83,29.26c5.16,8.62,13.06,15.46,22.29,19.42
		c9.88,4.24,20.58,5.07,31.07,2.74c5.49-1.22,10.85-3.23,15.85-5.77c4.65-2.37,8.9-5.47,12.11-9.61c6.26-8.04,8.56-18.51,8.72-28.53
		C103.27,50.1,100.82,39.28,95.52,29.98z M52.78,10.07c4.01,0.05,7.95,0.42,11.8,1.41c-0.76,3.79-1.52,7.59-2.28,11.38
		c-0.02,0.11-0.03,0.23-0.04,0.35c-0.54-0.08-1.08-0.15-1.62-0.2c-0.36-0.2-0.77-0.33-1.21-0.36c-4.4-0.31-8.95-0.51-13.31,0.23
		c-0.71-2.12-0.96-4.45-1.36-6.64c-0.35-1.93-0.7-3.86-1.05-5.79C46.7,9.95,49.84,10.04,52.78,10.07z M52.01,40.13
		c0.05,0.08,0.09,0.16,0.14,0.25c1.2,2.11,4.76,1.24,4.66-1.26c-0.16-3.72-0.31-7.43-0.47-11.15c5.06-0.25,9.95,0.78,13.83,4.43
		c4.11,3.88,7.16,9.1,8.88,14.46c3.48,10.85,1.25,23.71-7.64,31.37c-4.76,4.1-11.03,4.84-17.09,4.89c-5.45,0.04-10.65-1.32-15-4.72
		c-4.58-3.57-7.22-8.62-8.45-14.22c-1.32-5.96-1.62-12.56-0.4-18.56c1.21-5.95,4.22-11.85,9.46-15.2c3.45-2.2,7.39-2.92,11.39-3.05
		c0.15,3.62,0.3,7.24,0.45,10.86C51.61,38.84,51.67,39.51,52.01,40.13z M93.83,80.79c-1.96,3.98-4.67,7.58-8.25,10.25
		c-3.97,2.96-8.6,5.08-13.25,6.73c-9.3,3.3-19.26,4.36-28.87,1.76c-8.76-2.38-16.7-7.41-22.5-14.41
		c-5.77-6.96-9.22-15.96-9.81-24.97c-0.63-9.79,2.26-19.39,6.92-27.93c4.03-7.39,9.64-14.21,17.15-18.24
		c1.22-0.66,2.47-1.2,3.76-1.67c0.32,1.76,0.64,3.52,0.96,5.28c0.39,2.18,0.64,4.49,1.35,6.6c-0.87,0.33-1.73,0.71-2.57,1.16
		c-5.58,2.97-9.52,8.33-11.71,14.16c-2.54,6.76-2.65,14.35-1.74,21.43c0.88,6.79,3.02,13.33,7.75,18.44c4.17,4.51,9.92,7.55,16,8.4
		c3.72,0.52,7.54,0.41,11.26-0.01c3.61-0.41,7.14-1.21,10.36-2.97C82.7,78.21,87.39,62.87,85,50c-1.37-7.36-5.02-14.51-10.13-19.98
		c-2.22-2.37-4.85-4.3-7.84-5.52c0.04-0.1,0.08-0.2,0.1-0.3c0.74-3.71,1.48-7.43,2.23-11.14c7.22,2.92,13.6,7.95,18.33,14.1
		c5.84,7.6,9.21,17.05,10.13,26.55C98.69,62.73,97.88,72.54,93.83,80.79z"
              />
            </g>
          </g>
        </svg>
      </div>
      <div className={clsx([styles.led, { [styles.playing]: playing }])}></div>

      <ExpandedKnobPortal>
        <CSSTransition
          in={expand}
          classNames="overlayTransition"
          timeout={300}
          unmountOnExit
        >
          <Overlay />
        </CSSTransition>
        <CSSTransition
          in={expand}
          classNames="expandedKnobTransition"
          timeout={300}
          unmountOnExit
        >
          <ExpandedKnob
            materials={materials}
            offset={offset}
            selectedIndex={selectedIndex}
            onSelect={handleSelect}
          />
        </CSSTransition>
      </ExpandedKnobPortal>
    </div>
  )
}

export default React.memo(Knob)
