import React, { useCallback, useState } from 'react'
import Knob from './Knob'
import styles from './Sequencer.module.scss'
import { AnimSequence } from '../shared/types'
import clsx from 'clsx'
import SequencerTitle from './SequencerTitle'
import SequencerBolt from './SequencerBolt'
import ExpandedKnob from './ExpandedKnob'

interface SequencerProp {
  visible: boolean
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
  visible,
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
    <div className={clsx([styles.Sequencer, { [styles.visible]: visible }])}>
      <div className={styles.background}>
        <div className={styles.header}>
          <div></div>
          <SequencerTitle />
          <div>
            <button>redo</button>
            <button onClick={onUndo}>undo</button>
          </div>
        </div>
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
      <div className={styles.scrollWrapper}>
        <div className={clsx([styles.knobs])}>{renderKnobs()}</div>
      </div>
    </div>
  )
}

export default Sequencer
