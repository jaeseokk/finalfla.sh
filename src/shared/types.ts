import { AnimCategory, Sound } from './constants'

type AnimId = string

export interface AnimUnit {
  category: AnimCategory
  id: AnimId
  frameLength: number
  spriteSheetLength: number
  sound: Sound
}

export type AnimUnits = AnimUnit[]

export type AnimLayers = number[]

export type AnimSequence = AnimLayers[]
