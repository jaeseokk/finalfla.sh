import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import clsx from 'clsx'
import { createBrowserHistory } from 'history'
import jsonUrl from 'json-url/dist/browser/json-url'
import 'json-url/dist/browser/json-url-vendors~lzma'
import 'json-url/dist/browser/json-url-msgpack'
import 'json-url/dist/browser/json-url-vendors~msgpack'
import 'json-url/dist/browser/json-url-safe64'

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
import Credit from './Credit'
import Reference from './Reference'
import Share from './Share'
import createSoundSource from '../shared/createSoundSource'
import { Howl } from 'howler'

const history = createBrowserHistory()

const jsonUrlCompressor = jsonUrl('lzma')

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
  const [readyAnim, setReadyAnim] = useState(false)
  const [readySound, setReadySound] = useState(false)
  const readyAll = readyAnim && readySound
  const [soundSource, setSoundSource] = useState<Howl | null>(null)
  const [loadingExited, setLoadingExited] = useState(false)
  const [animSequence, setAnimSequence] = useState(initialAnimSequence)
  const [showCredit, setShowCredit] = useState(false)
  const [showReference, setShowReference] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [shareUrl, setShareUrl] = useState('')
  const { tickIndex, start, pause, resume } = useTicker(8)
  const showPopup = showCredit || showReference || showShare
  const { idle } = useMouseIdleTime({
    active: readyAll && !isMobile && !showPopup,
  })
  const sequencerVisible = useMemo(() => {
    if (isMobile) {
      return true
    }

    return !idle
  }, [idle])
  const { width: windowWidth, height: windowHeight } = useWindowResize()
  const loadSoundSource = useCallback(async () => {
    const soundSource = await createSoundSource()
    setSoundSource(soundSource)
    setReadySound(true)
  }, [])
  const checkProvidedAnimSequence = useCallback(async () => {
    const search = history.location.search
    const matches = search.match(/s=([^&]*)/)
    const compressedSequence = matches?.[1]

    if (!compressedSequence) {
      return
    }

    try {
      const sequence = await jsonUrlCompressor.decompress(compressedSequence)
      setAnimSequence(sequence as AnimSequence)
    } catch (e) {
      console.log(e)
    }
  }, [])
  const handleReadyAnim = useCallback(() => {
    setReadyAnim(true)
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

        // setHistory((prevHistory) => [...prevHistory, nextState])

        return nextState
      })
    },
    []
  )
  const handleUndo = useCallback(() => {
    // setHistory((prevHistory) => {
    //   const nextHistory = prevHistory.slice(0, -1)
    //   const snapshot =
    //     nextHistory.length === 0
    //       ? initialAnimSequence
    //       : nextHistory[nextHistory.length - 1]
    //   setAnimSequence(snapshot)
    //   return nextHistory
    // })
  }, [history])
  useEffect(() => {
    loadSoundSource()
  }, [])
  useEffect(() => {
    checkProvidedAnimSequence()
  }, [])
  useEffect(() => {
    if (readyAll) {
      start()
    }
  }, [readyAll])

  return (
    <div className={clsx([styles.App, { [styles.idle]: idle }])}>
      <Animation
        windowWidth={windowWidth}
        windowHeight={windowHeight}
        animSequence={animSequence}
        soundSource={soundSource}
        onReady={handleReadyAnim}
        tickIndex={tickIndex}
      />
      <div className={styles.layout}>
        <CSSTransition
          in={!readyAll}
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
              classNames="popupTransition"
              timeout={300}
              unmountOnExit
            >
              <Sequencer
                colCount={8}
                sequence={animSequence}
                tickIndex={tickIndex}
                onChangeKnobIndex={handleChangeKnobIndex}
                onClickCreditButton={() => {
                  pause()
                  setShowCredit(true)
                }}
                onClickReferenceButton={() => {
                  pause()
                  setShowReference(true)
                }}
                onClickShareButton={async () => {
                  pause()
                  const compressedSequence = await jsonUrlCompressor.compress(
                    animSequence
                  )
                  setShareUrl(
                    `${window.location.origin}?s=${compressedSequence}`
                  )
                  setShowShare(true)
                }}
                onUndo={handleUndo}
              />
            </CSSTransition>
          </>
        )}
      </div>
      <Credit
        show={showCredit}
        onClose={() => {
          resume()
          setShowCredit(false)
        }}
      />
      <Reference
        show={showReference}
        onClose={() => {
          resume()
          setShowReference(false)
        }}
      />
      <Share
        show={showShare}
        shareUrl={shareUrl}
        onClose={() => {
          resume()
          setShowShare(false)
        }}
      />
      <div id="expanded-knob"></div>
    </div>
  )
}

export default App
