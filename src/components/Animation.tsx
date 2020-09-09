import React, { useRef, useEffect, useCallback, useState } from 'react'
import * as PIXI from 'pixi.js'
import { AnimSequence } from '../shared/types'
import { animationUnits } from '../shared/animation-config'
import { isMobile } from '../shared/utils'

const ANIM_WIDTH = 1920
const ANIM_HEIGHT = 1080

interface AnimatinoProps {
  animSequence: AnimSequence
  tickIndex: number
  windowWidth: number
  windowHeight: number
  onReady: () => void
}

const Animation: React.FC<AnimatinoProps> = ({
  animSequence,
  tickIndex,
  windowWidth,
  windowHeight,
  onReady,
}) => {
  const [ready, setReady] = useState(false)
  const pixiAppRef = useRef<PIXI.Application>()
  const pixiElRef = useRef<HTMLDivElement>(null)
  const pixiContainerRef = useRef<PIXI.Container>()
  const spritesRef = useRef<{ [id: string]: PIXI.AnimatedSprite }>({})
  const resize = useCallback(() => {
    if (!pixiContainerRef.current || !pixiAppRef.current) {
      return
    }

    const ratio =
      isMobile && windowWidth < windowHeight
        ? Math.min(windowWidth / ANIM_WIDTH, windowHeight / ANIM_HEIGHT)
        : Math.max(windowWidth / ANIM_WIDTH, windowHeight / ANIM_HEIGHT)

    pixiContainerRef.current.scale.set(ratio)
    pixiContainerRef.current.x = pixiAppRef.current.screen.width / 2
    pixiContainerRef.current.y = pixiAppRef.current.screen.height / 2
  }, [windowWidth, windowHeight])
  const setup = useCallback(() => {
    if (!pixiContainerRef.current || !pixiAppRef.current) {
      return
    }

    pixiContainerRef.current.removeChildren()

    animationUnits.forEach((animUnit, i) => {
      if (!pixiContainerRef.current || !pixiAppRef.current) {
        return
      }

      const frames = []

      for (let i = 0; i < animUnit.frameLength; i++) {
        const index = i < 10 ? `0${i}` : `${i}`
        frames.push(PIXI.Texture.from(`${animUnit.id}_${index}.png`))
      }

      for (let i = 0; i < 8; i++) {
        const sprite = new PIXI.AnimatedSprite(frames)
        sprite.animationSpeed = 0.5
        sprite.loop = false
        sprite.anchor.set(0.5)
        sprite.visible = false

        spritesRef.current[`${animUnit.id}-${i}`] = sprite

        pixiContainerRef.current.addChild(sprite)
      }
    })

    pixiAppRef.current.renderer.plugins.prepare.upload(
      pixiContainerRef.current,
      () => {
        if (!pixiAppRef.current) {
          return
        }

        pixiAppRef.current.start()

        setReady(true)
        onReady()
      }
    )
  }, [])

  useEffect(() => {
    if (!pixiElRef.current) {
      return
    }

    pixiAppRef.current = new PIXI.Application({
      resizeTo: window,
      transparent: true,
      forceCanvas: true,
    })
    pixiAppRef.current.stop()

    pixiContainerRef.current = new PIXI.Container()

    pixiElRef.current.appendChild(pixiAppRef.current.view)
    pixiAppRef.current.stage.addChild(pixiContainerRef.current)

    if (isMobile) {
      for (let i = 0; i < 10; i++) {
        PIXI.Loader.shared.add(`assets/sprites/sprite-0-${i}_mobile.json`)
      }
      for (let i = 0; i < 8; i++) {
        PIXI.Loader.shared.add(`assets/sprites/sprite-1-${i}_mobile.json`)
      }
    } else {
      for (let i = 0; i < 38; i++) {
        PIXI.Loader.shared.add(`assets/sprites/sprite-0-${i}.json`)
      }
      for (let i = 0; i < 33; i++) {
        PIXI.Loader.shared.add(`assets/sprites/sprite-1-${i}.json`)
      }
    }

    PIXI.Loader.shared.load(setup)

    return () => {
      pixiContainerRef.current && pixiContainerRef.current.destroy()
      pixiAppRef.current && pixiAppRef.current.destroy()
    }
  }, [])

  useEffect(() => {
    if (!ready) {
      return
    }

    if (!animSequence[tickIndex]) {
      return
    }

    animSequence[tickIndex].forEach((index) => {
      if (index < 0) {
        return
      }

      if (!pixiContainerRef.current) {
        return
      }

      const animId = animationUnits[index].id

      const sprite = spritesRef.current[`${animId}-${tickIndex}`]

      sprite.visible = true
      sprite.play()
      sprite.onComplete = () => {
        sprite.visible = false
        sprite.gotoAndStop(0)
      }

      pixiContainerRef.current.removeChild(sprite)
      pixiContainerRef.current.addChild(sprite)
    })
  }, [ready, animSequence, tickIndex])

  useEffect(() => {
    resize()
  }, [windowWidth, windowHeight])

  return (
    <div>
      <div ref={pixiElRef}></div>
    </div>
  )
}

export default Animation
