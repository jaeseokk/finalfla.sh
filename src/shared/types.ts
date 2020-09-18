import { Category, Sound } from './constants'

type SequenceUnitId = string

export interface SequenceUnit {
  category: Category
  id: SequenceUnitId
  frameLength: number
  spriteSheetLength: number
  sound: Sound
}

export type Layers = number[]

export type Sequence = Layers[]
