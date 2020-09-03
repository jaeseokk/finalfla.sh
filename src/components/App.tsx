import React, { useState, useCallback } from 'react'
import Animation from './Animation'
import useTicker from '../shared/useTicker'
import useWindowResize from '../shared/useResize'
import { AnimSequence } from '../shared/types'
import styles from './App.module.scss'
import Sequencer from './Sequencer'
import Loading from './Loading'

const initialAnimSequence: AnimSequence = [
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
]

function App() {
  const [animSequence, setAnimSequence] = useState(initialAnimSequence)
  const [ready, setReady] = useState(false)
  const {
    tickIndex,
    isPlaying,
    subscribe,
    start,
    pause,
    reset,
    goTo,
  } = useTicker(8)
  const { width: windowWidth, height: windowHeight } = useWindowResize()
  const handleReady = useCallback(() => {
    setReady(true)
    start()
  }, [])
  const handleChangeKnobIndex = useCallback(
    (tickIndex, layerIndex, knobIndex) => {
      setAnimSequence((prev) => {
        return [
          ...prev.slice(0, tickIndex),
          [
            ...prev[tickIndex].slice(0, layerIndex),
            knobIndex,
            ...prev[tickIndex].slice(layerIndex + 1),
          ],
          ...prev.slice(tickIndex + 1),
        ]
      })
    },
    []
  )

  return (
    <div className={styles.App}>
      <Animation
        windowWidth={windowWidth}
        windowHeight={windowHeight}
        animSequence={animSequence}
        onReady={handleReady}
        tickIndex={tickIndex}
      />
      <div className={styles.layout}>
        {ready ? (
          <Sequencer
            rowCount={6}
            colCount={8}
            sequence={animSequence}
            tickIndex={tickIndex}
            onChangeKnobIndex={handleChangeKnobIndex}
          />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  )
}

export default App
