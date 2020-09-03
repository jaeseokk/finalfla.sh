import React, { useCallback } from 'react'
import Knob from './Knob'
import styles from './Sequencer.module.scss'
import { AnimSequence } from '../shared/types'
import clsx from 'clsx'
import SequencerTitle from './SequencerTitle'
import SequencerBolt from './SequencerBolt'

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
}

const Sequencer: React.FC<SequencerProp> = ({
  rowCount,
  colCount,
  sequence,
  tickIndex,
  onChangeKnobIndex,
}) => {
  const renderKnobs = useCallback(() => {
    const knobs = []

    for (let i = 0; i < rowCount; i++) {
      const row = []
      for (let j = 0; j < colCount; j++) {
        const selectedKnobIndex = sequence[j]?.[i]

        row.push(
          <Knob
            index={selectedKnobIndex}
            playing={tickIndex === j}
            onClick={(value) => {
              onChangeKnobIndex(j, i, value)
              // if (
              //   selectedKnobIndex === null ||
              //   selectedKnobIndex === animationUnits.length - 1
              // ) {
              //   onChangeKnobIndex(j, i, 0)
              //   return
              // }

              // onChangeKnobIndex(j, i, selectedKnobIndex + 1)
            }}
          />
        )
      }
      knobs.push(<div className={styles.row}>{row}</div>)
    }

    return knobs
  }, [rowCount, colCount, sequence, tickIndex])

  return (
    <div className={styles.Sequencer}>
      <div className={styles.background}>
        <div className={styles.title}>
          <SequencerTitle />
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
