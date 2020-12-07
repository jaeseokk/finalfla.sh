import React, { useMemo } from 'react'
import Knob from './Knob'
import styles from './Sequencer.module.scss'
import { Sequence } from '../shared/types'
import clsx from 'clsx'
import SequencerTitle from './SequencerTitle'
import SequencerBolt from './SequencerBolt'
import RedoButton from './RedoButton'
import UndoButton from './UndoButton'
import AboutButton from './AboutButton'
import HowtoButton from './HowtoButton'
import ShareButton from './ShareButton'
import { Category } from '../shared/constants'
import ClearButton from './ClearButton'
import MuteButton from './MuteButton'
import SoloButton from './SoloButton'
import IconPatterns from './IconPatterns'

interface SequencerProp {
  stepCount: number
  sequence: Sequence
  tickIndex: number
  muteStatus: boolean[]
  soloStatus: boolean[]
  onChangeKnobIndex: (
    tickIndex: number,
    layerIndex: number,
    knobIndex: number
  ) => void
  onChangeMuteStatus: (layerIndex: number, state: boolean) => void
  onChangeSoloStatus: (layerIndex: number, state: boolean) => void
  onClickTitle: () => void
  onClickAboutButton: () => void
  onClickHowtoButton: () => void
  onClickShareButton: () => void
  onReset: () => void
  onUndo: () => void
  onRedo: () => void
}

const Sequencer: React.FC<SequencerProp> = ({
  stepCount,
  sequence,
  tickIndex,
  muteStatus,
  soloStatus,
  onChangeKnobIndex,
  onChangeMuteStatus,
  onChangeSoloStatus,
  onClickTitle,
  onClickAboutButton,
  onClickHowtoButton,
  onClickShareButton,
  onReset,
  onUndo,
  onRedo,
}) => {
  const isSoloing = useMemo(() => soloStatus.includes(true), [soloStatus])

  return (
    <div className={clsx([styles.Sequencer])}>
      <IconPatterns />
      <div className={styles.background}>
        <div className={clsx([styles.bolt, styles.top, styles.left])}>
          <SequencerBolt />
        </div>
        <div className={clsx([styles.bolt, styles.top, styles.right])}>
          <SequencerBolt />
        </div>
        <div className={clsx([styles.bolt, styles.bottom, styles.right])}>
          <SequencerBolt />
        </div>
        <div className={clsx([styles.bolt, styles.bottom, styles.left])}>
          <SequencerBolt />
        </div>
        <div className={styles.bolt}></div>
      </div>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={clsx([styles.wrapper, styles.small])}>
            <SequencerTitle onClick={onClickTitle} />
          </div>
          <div className={styles.wrapper}>
            <div className={styles.left}>
              <AboutButton onClick={onClickAboutButton} />
              <HowtoButton onClick={onClickHowtoButton} />
              <ShareButton onClick={onClickShareButton} />
            </div>
            <div className={styles.center}>
              <SequencerTitle onClick={onClickTitle} />
            </div>
            <div className={styles.right}>
              <ClearButton onClick={onReset} />
              <UndoButton onClick={onUndo} />
              <RedoButton onClick={onRedo} />
            </div>
          </div>
        </div>
        <div className={styles.scrollWrapper}>
          <div className={clsx([styles.knobs])}>
            {[
              Category.DR,
              Category.BS,
              Category.MEL,
              Category.FX,
              Category.AMBIENT,
              Category.TRADITIONAL,
            ].map((category, i) => (
              <div key={category} className={styles.row}>
                <div className={styles.controller}>
                  <MuteButton
                    active={muteStatus[i]}
                    onClick={() => {
                      onChangeMuteStatus(i, !muteStatus[i])
                    }}
                  />
                  <SoloButton
                    active={soloStatus[i]}
                    onClick={() => {
                      onChangeSoloStatus(i, !soloStatus[i])
                    }}
                  />
                </div>
                {Array.from(Array(stepCount), (v, j) => (
                  <Knob
                    key={`${category}-${j}`}
                    category={category}
                    selectedIndex={sequence[j][i]}
                    playing={tickIndex === j}
                    muted={muteStatus[i] || (isSoloing && !soloStatus[i])}
                    onSelect={(index) => {
                      if (sequence[j][i] === index) {
                        return
                      }

                      onChangeKnobIndex(j, i, index)
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sequencer
