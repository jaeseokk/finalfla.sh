import React, { useState, useCallback, useMemo } from 'react'
import { CSSTransition } from 'react-transition-group'
import clsx from 'clsx'

import Animation from './Animation'
import useTicker from '../shared/useTicker'
import useWindowResize from '../shared/useResize'
import { AnimSequence } from '../shared/types'
import styles from './App.module.scss'
import Sequencer from './Sequencer'
import Loading from './Loading'
import useMouseIdleTime from '../shared/useMouseIdleTime'
import Background from './Background'
import { isMobile } from '../shared/utils'

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
  const [ready, setReady] = useState(false)
  const [loadingExited, setLoadingExited] = useState(false)
  const [animSequence, setAnimSequence] = useState(initialAnimSequence)
  const [history, setHistory] = useState<any[]>([])
  const { tickIndex, start } = useTicker(8)
  const { idle } = useMouseIdleTime({
    active: ready && !isMobile,
  })
  const sequencerVisible = useMemo(() => {
    if (isMobile) {
      return true
    }

    return !idle
  }, [idle])
  const { width: windowWidth, height: windowHeight } = useWindowResize()
  const handleReady = useCallback(() => {
    setReady(true)
    start()
  }, [])
  const handleChangeKnobIndex = useCallback(
    (tickIndex, layerIndex, knobIndex) => {
      setAnimSequence((prev) => {
        const nextState = [
          ...prev.slice(0, tickIndex),
          [
            ...prev[tickIndex].slice(0, layerIndex),
            knobIndex,
            ...prev[tickIndex].slice(layerIndex + 1),
          ],
          ...prev.slice(tickIndex + 1),
        ]

        setHistory((prevHistory) => [...prevHistory, nextState])

        return nextState
      })
    },
    []
  )
  const handleUndo = useCallback(() => {
    setHistory((prevHistory) => {
      const nextHistory = prevHistory.slice(0, -1)
      const snapshot =
        nextHistory.length === 0
          ? initialAnimSequence
          : nextHistory[nextHistory.length - 1]

      setAnimSequence(snapshot)

      return nextHistory
    })
  }, [history])

  return (
    <div className={clsx([styles.App, { [styles.idle]: idle }])}>
      <Animation
        windowWidth={windowWidth}
        windowHeight={windowHeight}
        animSequence={animSequence}
        onReady={handleReady}
        tickIndex={tickIndex}
      />
      <div className={styles.layout}>
        <CSSTransition
          in={!ready}
          classNames="loadingTransition"
          timeout={300}
          onExited={() => {
            setLoadingExited(true)
          }}
          unmountOnExit
        >
          <Loading />
        </CSSTransition>
        {loadingExited && (
          <>
            <Background />
            <CSSTransition
              in={sequencerVisible}
              classNames="expandedKnobTransition"
              timeout={300}
              unmountOnExit
            >
              <Sequencer
                colCount={8}
                sequence={animSequence}
                tickIndex={tickIndex}
                onChangeKnobIndex={handleChangeKnobIndex}
                onUndo={handleUndo}
              />
            </CSSTransition>
          </>
        )}
      </div>
      <div id="expanded-knob"></div>
    </div>
  )
}

export default App
