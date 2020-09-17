import getAgent from '@egjs/agent'
import { Sequence } from './types'

export const calculateAngle = (
  originX: number,
  originY: number,
  x: number,
  y: number
) => {
  return (Math.atan2(y - originY, x - originX) * 180) / Math.PI + 90
}

export const validateSequence = (
  sequence: Sequence,
  steps: number,
  layers: number
) => {
  if (sequence.length !== steps) {
    return false
  }

  let isValidLayerCount = true

  for (let i = 0; i < steps; i++) {
    if (sequence[i].length !== layers) {
      isValidLayerCount = false
      break
    }
  }

  return isValidLayerCount
}

export const agent = getAgent()

export const isMobile = agent.isMobile

export const isWebkit = agent.browser.webkit
