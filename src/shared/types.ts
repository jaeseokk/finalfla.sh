type AnimId = string

export interface AnimUnit {
  id: AnimId
  frameLength: Number
  spriteSheetLength: Number
}

export type AnimUnits = AnimUnit[]

export type AnimLayers = number[]

export type AnimSequence = AnimLayers[]
