import React, { useCallback } from 'react'
import Knob from './Knob'
import styles from './Sequencer.module.scss'
import { AnimSequence } from '../shared/types'
import clsx from 'clsx'
import SequencerTitle from './SequencerTitle'
import SequencerBolt from './SequencerBolt'
import RedoButton from './RedoButton'
import UndoButton from './UndoButton'
import CreditButton from './CreditButton'
import ReferenceButton from './ReferenceButton'
import ShareButton from './ShareButton'

interface SequencerProp {
  rowCount: number
  colCount: number
  sequence: AnimSequence
  tickIndex: number
  onChangeKnobIndex: (
    tickIndex: number,
    layerIndex: number,
    knobIndex: number
  ) => void
  onUndo: () => void
}

const Sequencer: React.FC<SequencerProp> = ({
  rowCount,
  colCount,
  sequence,
  tickIndex,
  onChangeKnobIndex,
  onUndo,
}) => {
  const renderKnobs = useCallback(() => {
    const knobs = []

    for (let i = 0; i < rowCount; i++) {
      const row = []
      for (let j = 0; j < colCount; j++) {
        const selectedKnobIndex = sequence[j]?.[i]

        row.push(
          <Knob
            key={j}
            selectedIndex={selectedKnobIndex}
            playing={tickIndex === j}
            onSelect={(index) => {
              onChangeKnobIndex(j, i, index)
            }}
          />
        )
      }
      knobs.push(
        <div key={i} className={styles.row}>
          {row}
        </div>
      )
    }

    return knobs
  }, [rowCount, colCount, sequence, tickIndex])

  return (
    <div className={clsx([styles.Sequencer])}>
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
            <SequencerTitle />
          </div>
          <div className={styles.wrapper}>
            <div className={styles.left}>
              <ShareButton />
              <ReferenceButton />
              <CreditButton />
            </div>
            <div className={styles.center}>
              <SequencerTitle />
            </div>
            <div className={styles.right}>
              <UndoButton />
              <RedoButton />
            </div>
          </div>
        </div>
        <div className={styles.scrollWrapper}>
          <div className={clsx([styles.knobs])}>{renderKnobs()}</div>
        </div>
      </div>
    </div>
  )
}

export default Sequencer
