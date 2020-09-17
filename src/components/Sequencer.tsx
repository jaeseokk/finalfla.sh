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
import { AnimCategory } from '../shared/constants'
import ClearButton from './ClearButton'

interface SequencerProp {
  colCount: number
  sequence: AnimSequence
  tickIndex: number
  onChangeKnobIndex: (
    tickIndex: number,
    layerIndex: number,
    knobIndex: number
  ) => void
  onClickCreditButton: () => void
  onClickReferenceButton: () => void
  onClickShareButton: () => void
  onReset: () => void
  onUndo: () => void
  onRedo: () => void
}

const Sequencer: React.FC<SequencerProp> = ({
  colCount,
  sequence,
  tickIndex,
  onChangeKnobIndex,
  onClickCreditButton,
  onClickReferenceButton,
  onClickShareButton,
  onReset,
  onUndo,
  onRedo,
}) => {
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
              <CreditButton onClick={onClickCreditButton} />
              <ReferenceButton onClick={onClickReferenceButton} />
              <ShareButton onClick={onClickShareButton} />
            </div>
            <div className={styles.center}>
              <SequencerTitle />
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
              AnimCategory.DR,
              AnimCategory.BS,
              AnimCategory.MEL,
              AnimCategory.FX,
              AnimCategory.AMBIENT,
              AnimCategory.TRADITIONAL,
            ].map((category, i) => (
              <div key={category} className={styles.row}>
                {Array.from(Array(colCount), (v, j) => (
                  <Knob
                    key={`${category}-${j}`}
                    category={category}
                    selectedIndex={sequence[j][i]}
                    playing={tickIndex === j}
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
