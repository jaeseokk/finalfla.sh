import React, { useCallback, useEffect } from 'react'
import clsx from 'clsx'
import useDial from '../shared/useDial'
import styles from './ExpandedKnob.module.scss'
import { Category } from '../shared/constants'
import { SequenceUnit } from '../shared/types'

interface ExpandedKnobProp {
  materials: SequenceUnit[]
  offset: number
  category: Category
  selectedIndex: number
  onSelect: (value: number) => void
}

interface MaterialsProp {
  materials: SequenceUnit[]
  offset: number
  selectedIndex: number
}

const Materials: React.FC<MaterialsProp> = React.memo(
  ({ materials, selectedIndex }) => {
    return (
      <div className={clsx([styles.Materials])}>
        <ul>
          <li
            className={clsx({ [styles.selected]: selectedIndex === -1 })}
            style={{
              transform: `translateY(-50%)`,
            }}
          >
            <div style={{ background: '#fff' }}></div>
          </li>
          {materials.map(({ id }, i) => {
            const selected = i === selectedIndex

            return (
              <li
                key={id}
                className={clsx({ [styles.selected]: selected })}
                style={{
                  transform: `rotate(${
                    (360 / (materials.length + 1)) * (i + 1)
                  }deg) translateY(-50%)`,
                }}
              >
                <div></div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
)

const Overlay: React.FC = () => {
  return <div className={styles.Overlay}></div>
}

const ExpandedKnob: React.FC<ExpandedKnobProp> = ({
  materials,
  offset,
  category,
  selectedIndex,
  onSelect,
}) => {
  const { value } = useDial({
    initialValue: selectedIndex - offset,
    min: -1,
    max: materials.length - 1,
    active: true,
  })
  const handleMouseUp = useCallback(() => {
    const nextSelectedIndex = value === -1 ? value : value + offset
    onSelect(nextSelectedIndex)
  }, [onSelect, value, offset])
  const id = value < 0 ? null : materials[value].id
  const patternId = id ? `icon-${id}-for-expanded` : undefined
  const fill = patternId ? `url(#${patternId})` : '#fff'
  useEffect(() => {
    window.addEventListener('touchend', handleMouseUp)
    return () => {
      window.removeEventListener('touchend', handleMouseUp)
    }
  }, [handleMouseUp])

  return (
    <div className={clsx([styles.ExpandedKnob])} onMouseUp={handleMouseUp}>
      <div className={styles.knobWrapper}>
        <Materials
          materials={materials}
          offset={offset}
          selectedIndex={value}
        />
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 127 129"
        >
          <g>
            <path
              fill="#B7B7B7"
              d="M115.41,54.18c-0.08-0.55-0.15-1.11-0.26-1.67c-0.27-1.4-0.89-2.68-1.75-3.81c-0.07-0.34-0.14-0.67-0.24-1.02
			c-3.06-10.57-9.93-20.81-18.97-27.1c-8.28-5.76-19.73-10.91-29.98-9.73c-0.33,0.04-0.66,0.09-0.99,0.14
			c-2.02-0.23-4.05-0.36-6.1-0.36c-3.09,0-5.53,1.01-7.33,2.59c-3.67,0.68-7.3,1.83-10.54,2.91c-2.96,0.98-5.5,2.78-7.36,5.07
			c-6.61,3.58-12.06,8.88-15.88,15.46c-0.38,0.45-0.75,0.91-1.1,1.4c-1.07,1.52-1.82,3.21-2.34,4.99c-1.06,1.98-1.83,3.91-2.38,5.91
			c-3.72,10.7-4.21,22.4,0,33.19c2.94,7.54,7.61,14.42,13.65,19.75c1.21,2.38,3.05,4.44,5.47,5.84c0.06,0.03,0.12,0.06,0.18,0.1
			c0.89,0.6,1.79,1.19,2.68,1.79c0.91,0.61,1.82,1.07,2.74,1.43c1.61,1.44,3.54,2.58,5.69,3.31c1.32,0.44,2.63,0.89,3.95,1.33
			c0.28,0.09,0.55,0.16,0.82,0.23c0.01,0.01,0.03,0.01,0.04,0.01l0,0c0.56,0.15,1.12,0.27,1.67,0.35c1.8,1.1,3.91,1.79,6.16,2.01
			c22.18,2.13,48.25-8.34,56.47-29.64c1.2-1.32,2.18-2.91,2.9-4.66c2.64-6.36,3.79-13.06,4.83-19.84
			C117.99,60.55,117.34,56.93,115.41,54.18z"
            />
            <path
              d="M42.9,15.95c11.33-4.4,24.06-5.12,35.79-1.91c5.83,1.59,11.54,4.08,16.3,7.86c4.55,3.61,8.24,8.22,11.34,13.11
					c6.38,10.05,10.43,22,9.21,34c-0.62,6.09-2.72,12.03-5.44,17.49c-2.52,5.06-5.66,9.83-9.46,14.02
					c-14.26,15.75-37.56,21.19-57.47,13.91c-19.25-7.03-32.82-26.4-34.05-46.69C7.91,47.79,19,28.64,36.38,19
					C38.48,17.84,40.66,16.81,42.9,15.95c1.78-0.69,1.01-3.59-0.8-2.89C22.36,20.7,7.98,39.16,6.2,60.37
					c-1.8,21.44,10.11,43.41,28.98,53.71c19.3,10.54,44.63,8.1,61.65-5.78c9.37-7.65,16.28-18.57,19.84-30.08
					c3.8-12.31,1.97-25.18-3.37-36.73c-5.23-11.31-13.42-21.78-24.93-27.1c-11.63-5.38-25-6.64-37.5-3.96
					c-2.99,0.64-5.92,1.52-8.77,2.63C40.32,13.75,41.1,16.65,42.9,15.95L42.9,15.95z"
            />
          </g>
          <g>
            <path
              fill={fill}
              d="M86.07,53.29c-2.48-5.9-7.96-11.62-14.36-13.36c-5-2.3-10.23-2.2-15.73-1.65c-0.29,0.03-0.55,0.1-0.8,0.19
			c-0.98-0.41-2.17-0.37-3.21,0.5c-1.97,1.65-4.48,2.31-6.56,3.79c-1.62,1.16-2.57,2.68-3.76,4.21c-3.11,3.98-5.89,6.87-6.99,12.06
			c-1.66,7.87,0.5,15.77,5.56,21.69c8.41,16.13,37.06,15.09,45.55-0.97C89.99,71.8,89.5,61.44,86.07,53.29z"
            />
          </g>
          <g
            className={styles.rotateWrapper}
            style={{
              transform: `rotate(${
                (360 / (materials.length + 1)) * (value + 1)
              }deg)`,
            }}
          >
            <g className={styles.lightWrapper}>
              <path
                className={clsx([
                  styles[category],
                  { [styles.selected]: value > -1 },
                ])}
                fill="#FFFFFF"
                d="M65.55,24.35c0.01-0.41-0.07-0.83-0.22-1.22c-0.31-1.16-1.7-2.04-2.84-2.02c-0.17,0-0.33,0.01-0.5,0.01
        c-1.07,0.03-1.83,0.47-2.31,1.09c-0.87,0.42-1.48,1.26-1.35,2.56c0.22,2.31,0.26,4.6,0.3,6.92c0.04,2.27,0.37,5.3,2.76,5.38
        C63.36,37.16,65.2,37.71,66,36C67.47,32.84,66.12,27.85,65.55,24.35z"
              />
            </g>
            <path
              fill="#5B5B5B"
              d="M104.23,56.32c-1.2-6.19-4.71-12.52-8.55-17.45c-3.65-4.69-8.31-8.51-13.34-11.65
			c-2.98-1.86-6.83-4.9-10.33-4.21c-1.33-2.41-5.76-1.97-5.63,1.36c0.14,3.48,0.28,6.97,0.43,10.45c0.05,1.31,0.89,2.55,2.2,2.89
			c2.19,0.58,4.05,1.41,5.95,2.63c0.57,0.36,1.16,0.47,1.74,0.41c0.05,0.03,0.08,0.07,0.13,0.11c11.54,7.98,12.7,20.53,11.93,33.29
			c-0.19,0.27-0.35,0.59-0.45,0.97c-1.71,6.43-6.12,8.81-10.5,13.17c-0.18,0.18-0.32,0.37-0.45,0.57c-0.67,0.21-1.31,0.55-1.87,0.99
			c-9.1,2.27-18.38,4.16-27.36-0.06c-0.51-0.24-1-0.33-1.47-0.31c-3.53-3.71-7.28-7.4-9.96-11.73c-0.18-0.3-0.4-0.53-0.62-0.73
			c-0.01-0.03-0.02-0.05-0.03-0.08c-1.83-3.57-2.66-7.41-3.17-11.33c0.53-0.48,0.89-1.17,0.91-2.09c0.08-3.69,0.49-7.43,2.06-10.81
			c0.65-1.4,1.52-2.66,2.45-3.9c0.64-0.03,1.31-0.31,1.91-0.97c3.06-3.39,6.41-6.26,10.28-8.71c0.09-0.06,0.15-0.12,0.23-0.18
			c1.31-0.36,2.63-0.61,4.04-0.69c2.09-0.12,3.23-1.81,2.89-3.8c-0.07-0.36-0.12-0.72-0.16-1.08c0.01-0.45-0.01-0.91-0.09-1.36
			c-0.01-0.09-0.03-0.16-0.05-0.24c-0.08-2.41-0.02-4.8,0.19-7.23c0.16-1.82-2.06-3.56-3.8-2.89c-7.22,2.8-14.94,5.72-20.46,11.37
			c-0.24,0.24-0.4,0.5-0.54,0.76c-0.56,0.08-1.11,0.34-1.55,0.86c-0.74,0.86-1.4,1.75-2.02,2.65c-0.26,0.34-0.52,0.69-0.78,1.03
			c-0.8,0.99-1.55,1.98-2.22,2.92c-0.45,0.62-0.6,1.23-0.55,1.79c-1.91,3.62-3.47,7.36-4.66,11.24c-0.25,0.31-0.44,0.7-0.56,1.18
			c-0.29,1.14-0.5,2.26-0.67,3.39c-0.03,0.13-0.05,0.25-0.08,0.38c-0.21,0.95-0.4,1.9-0.57,2.86c-0.13,0.78,0.01,1.46,0.32,2.02
			c-0.08,1.62-0.06,3.22,0.03,4.82c0.04,1.43,0.2,2.84,0.42,4.27c0.09,0.59,0.31,1.03,0.6,1.37c0.01,0.18,0.04,0.37,0.09,0.56
			c2,7.91,6.73,14.04,12.54,19.29c1.72,2.13,3.73,3.82,6.28,5.11c0.66,0.34,1.29,0.44,1.86,0.38c1.75,1.08,3.57,2.04,5.43,2.89
			c5.75,2.6,12.09,4.24,18.44,4.11c3.53-0.07,8.73-0.32,11.74-2.79c0.11,0,0.22,0.01,0.33,0c5.08-0.36,10.93-4.75,14.34-8.19
			c4.79-4.84,7.93-10.88,10.87-16.94c0.17-0.36,0.26-0.71,0.3-1.05c0.11-0.27,0.23-0.54,0.35-0.82c0.35-0.86,0.2-1.65-0.22-2.28
			C104.18,68.79,105.44,62.51,104.23,56.32z"
            />
            <path
              d="M58.5,23c15.95-1.37,32.18,7.13,39.96,21.17c8.03,14.5,6.62,33.38-3.92,46.25c-5.25,6.4-12.31,11.23-20.27,13.54
						c-8.95,2.6-18.56,2.04-27.18-1.49c-4.36-1.79-8.66-4.2-12.44-7.01c-3.79-2.82-6.56-6.69-9.07-10.65
						c-2.38-3.75-4.14-8.21-5.09-12.55c-0.92-4.22-0.62-8.85,0.03-13.09c1.28-8.35,4.61-16.54,10.36-22.82
						c5.69-6.22,13.34-10.65,21.56-12.5C54.43,23.39,56.45,23.11,58.5,23c1.92-0.1,1.93-3.11,0-3c-9.11,0.5-17.83,4.08-24.95,9.74
						c-7.11,5.66-12.02,13.53-14.53,22.22c-1.28,4.44-1.96,9.08-2.05,13.7c-0.09,5.04,0.99,9.58,2.85,14.24
						c1.79,4.5,4.34,8.55,7.33,12.34c3.11,3.94,7.08,6.77,11.39,9.27c8.82,5.1,18.6,7.92,28.84,6.81
						c9.15-0.99,17.73-4.79,24.59-10.92c13.43-11.99,18.07-31.43,11.97-48.31c-5.93-16.41-21.7-27.93-39.05-29.16
						c-2.14-0.15-4.27-0.12-6.41,0.06C56.59,20.16,56.57,23.16,58.5,23L58.5,23z"
            />
            <path
              d="M58.5,39c9.77-0.82,19.78,3.57,25.24,11.84c5.47,8.29,5.68,19.53,0.79,28.15c-2.86,5.03-7.25,8.73-12.74,10.58
						c-5.74,1.93-12.16,2.58-18.01,0.76c-10.87-3.39-17.77-14.34-18.39-25.39c-0.19-3.43,0.26-6.89,1.76-10.01
						c1.35-2.81,3.27-5.35,5.41-7.6C46.7,42.97,52.3,39.08,58.5,39c1.93-0.03,1.93-3.03,0-3c-6.19,0.08-11.84,3.38-16.29,7.46
						c-4.54,4.16-8.53,9.63-9.52,15.83c-1.98,12.29,4.52,25.97,15.5,31.9c5.89,3.18,12.59,3.78,19.12,2.61
						c6.4-1.15,12.42-3.86,16.69-8.88c7.37-8.64,9.04-21.31,4.48-31.66C83.43,41.81,70.83,34.96,58.5,36
						C56.59,36.16,56.57,39.16,58.5,39L58.5,39z"
            />
            <path
              d="M56.59,22.83c0.32,4.41,0.43,8.84,0.31,13.26c-0.05,1.93,2.95,1.93,3,0c0.12-4.42,0.01-8.85-0.31-13.26
						c-0.06-0.81-0.65-1.5-1.5-1.5C57.32,21.33,56.53,22.02,56.59,22.83L56.59,22.83z"
            />
            <path
              d="M64.79,22.57c0.12,4.46,0.19,8.93,0.2,13.39c0,1.93,3,1.93,3,0c-0.01-4.47-0.08-8.93-0.2-13.39
						C67.73,20.64,64.73,20.63,64.79,22.57L64.79,22.57z"
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

export { Overlay }

export default React.memo(ExpandedKnob)
