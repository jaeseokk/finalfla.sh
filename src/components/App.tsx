import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import clsx from 'clsx'
import jsonUrl from 'json-url/dist/browser/json-url'
import 'json-url/dist/browser/json-url-vendors~lzma'
import 'json-url/dist/browser/json-url-msgpack'
import 'json-url/dist/browser/json-url-vendors~msgpack'
import 'json-url/dist/browser/json-url-safe64'

import Animation from './Animation'
import useTicker from '../shared/useTicker'
import useWindowResize from '../shared/useResize'
import { Sequence } from '../shared/types'
import styles from './App.module.scss'
import Sequencer from './Sequencer'
import Loading from './Loading'
import useMouseIdleTime from '../shared/useMouseIdleTime'
import Background from './Background'
import { validateSequence, isEmptySequence, range } from '../shared/utils'
import About from './About'
import Share from './Share'
import createSoundSource from '../shared/createSoundSource'
import { Howl } from 'howler'
import useHistory from '../shared/useHistory'
import { INITIAL_SEQUENCE, STEPS, LAYERS } from '../shared/constants'

const jsonUrlCompressor = jsonUrl('lzma')

function App() {
  const [readyAnim, setReadyAnim] = useState(false)
  const [readySound, setReadySound] = useState(false)
  const readyAll = readyAnim && readySound
  const [soundSource, setSoundSource] = useState<Howl | null>(null)
  const [loadingExited, setLoadingExited] = useState(false)
  const [startSequencer, setStartSequencer] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [shareUrl, setShareUrl] = useState('')
  const [glove, setGlove] = useState(false)
  const { redo, undo, set: setSequence, reset, history } = useHistory<Sequence>(
    INITIAL_SEQUENCE
  )
  const { current: sequence } = history
  const [muteStatus, setMuteStatus] = useState(range(LAYERS, false))
  const [soloStatus, setSoloStatus] = useState(range(LAYERS, false))
  const { tickIndex, start, pause, resume } = useTicker(STEPS)
  const showPopup = showAbout || showShare
  const { idle } = useMouseIdleTime({
    active: readyAll && !showPopup,
  })
  const sequencerVisible = useMemo(() => {
    return !idle || isEmptySequence(sequence)
  }, [idle, sequence])
  const { width: windowWidth, height: windowHeight } = useWindowResize()
  const loadSoundSource = useCallback(async () => {
    const soundSource = await createSoundSource()
    setSoundSource(soundSource)
    setReadySound(true)
  }, [])
  const checkProvidedSequence = useCallback(async () => {
    const search = window.location.search
    const matches = search.match(/s=([^&]*)/)
    const compressedSequence = matches?.[1]

    if (!compressedSequence) {
      return
    }

    try {
      const sequence = (await jsonUrlCompressor.decompress(
        compressedSequence
      )) as Sequence

      if (!validateSequence(sequence, STEPS, LAYERS)) {
        return
      }

      setSequence(sequence as Sequence)
    } catch (e) {
      console.log(e)
    }
  }, [setSequence])
  const handleReadyAnim = useCallback(() => {
    setReadyAnim(true)
  }, [])
  const handleChangeKnobIndex = useCallback(
    (tickIndex, layerIndex, knobIndex) => {
      setSequence([
        ...sequence.slice(0, tickIndex),
        [
          ...sequence[tickIndex].slice(0, layerIndex),
          knobIndex,
          ...sequence[tickIndex].slice(layerIndex + 1),
        ],
        ...sequence.slice(tickIndex + 1),
      ])
    },
    [setSequence]
  )
  const handleChangeMuteStatus = useCallback((layerIndex, state) => {
    setMuteStatus((prev) => [
      ...prev.slice(0, layerIndex),
      state,
      ...prev.slice(layerIndex + 1),
    ])
  }, [])
  const handleChangeSoloStatus = useCallback((layerIndex, state) => {
    setSoloStatus((prev) => [
      ...prev.slice(0, layerIndex),
      state,
      ...prev.slice(layerIndex + 1),
    ])
  }, [])
  const handleReset = useCallback(() => {
    reset()
  }, [reset])
  const handleUndo = useCallback(() => {
    undo()
  }, [undo])
  const handleRedo = useCallback(() => {
    redo()
  }, [redo])
  useEffect(() => {
    loadSoundSource()
  }, [])
  useEffect(() => {
    checkProvidedSequence()
  }, [])
  useEffect(() => {
    if (startSequencer) {
      start()
    }
  }, [startSequencer])

  return (
    <div
      id="app"
      className={clsx([styles.App, { [styles.idle]: idle, glove }])}
    >
      <Animation
        windowWidth={windowWidth}
        windowHeight={windowHeight}
        sequence={sequence}
        soundSource={soundSource}
        muteStatus={muteStatus}
        soloStatus={soloStatus}
        onReady={handleReadyAnim}
        tickIndex={tickIndex}
      />
      <div className={styles.layout}>
        <CSSTransition
          in={!startSequencer}
          classNames="loadingTransition"
          timeout={300}
          onExited={() => {
            setLoadingExited(true)
          }}
          unmountOnExit
        >
          <Loading
            ready={readyAll}
            onClick={() => {
              setStartSequencer(true)
            }}
          />
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
                stepCount={STEPS}
                sequence={sequence}
                tickIndex={tickIndex}
                muteStatus={muteStatus}
                soloStatus={soloStatus}
                onChangeKnobIndex={handleChangeKnobIndex}
                onChangeMuteStatus={handleChangeMuteStatus}
                onChangeSoloStatus={handleChangeSoloStatus}
                onClickTitle={() => {
                  setGlove(true)
                }}
                onClickAboutButton={() => {
                  pause()
                  setShowAbout(true)
                }}
                onClickHowtoButton={() => {
                  window.open('http://finalfla.sh', '_blank')
                }}
                onClickShareButton={async () => {
                  pause()
                  const compressedSequence = await jsonUrlCompressor.compress(
                    sequence
                  )
                  setShareUrl(
                    `${window.location.origin}?s=${compressedSequence}`
                  )
                  setShowShare(true)
                }}
                onReset={handleReset}
                onUndo={handleUndo}
                onRedo={handleRedo}
              />
            </CSSTransition>
          </>
        )}
      </div>
      <About
        show={showAbout}
        onClose={() => {
          resume()
          setShowAbout(false)
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
