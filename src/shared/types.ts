type AnimId = string

export enum AnimCategory {
  A,
  B,
  C,
  D,
  E,
  F,
}

export interface AnimUnit {
  category?: AnimCategory
  id: AnimId
  frameLength: number
  spriteSheetLength: number
  sound?: string
}

export type AnimUnits = AnimUnit[]

export type AnimLayers = number[]

export type AnimSequence = AnimLayers[]
