import { Howl } from 'howler'
import { Sound } from './constants'

const createSoundSource = (): Promise<Howl> => {
  return new Promise((resolve) => {
    const soundSource = new Howl({
      src: [
        require('../assets/sounds/sprite.webm'),
        require('../assets/sounds/sprite.mp3'),
      ],
      sprite: {
        [Sound.DR_1]: [0, 1008.0045351473923],
        [Sound.DR_10]: [3000, 1008.0045351473927],
        [Sound.DR_11]: [6000, 1008.0045351473927],
        [Sound.DR_12]: [9000, 1008.0045351473927],
        [Sound.DR_2]: [12000, 1008.0045351473927],
        [Sound.DR_3]: [15000, 1008.0045351473927],
        [Sound.DR_4]: [18000, 1008.0045351473927],
        [Sound.DR_5]: [21000, 1008.0045351473927],
        [Sound.DR_6]: [24000, 1008.0045351473927],
        [Sound.DR_7]: [27000, 1008.0045351473927],
        [Sound.DR_8]: [30000, 1008.0045351473927],
        [Sound.DR_9]: [33000, 1008.0045351473927],
        [Sound.BS_1]: [36000, 1008.0045351473927],
        [Sound.BS_10]: [39000, 1008.0045351473927],
        [Sound.BS_11]: [42000, 1008.0045351473927],
        [Sound.BS_12]: [45000, 1008.0045351473927],
        [Sound.BS_2]: [48000, 1008.0045351473927],
        [Sound.BS_3]: [51000, 1008.0045351473927],
        [Sound.BS_4]: [54000, 1008.0045351473927],
        [Sound.BS_5]: [57000, 1008.0045351473927],
        [Sound.BS_6]: [60000, 1008.0045351473927],
        [Sound.BS_7]: [63000, 1008.0045351473927],
        [Sound.BS_8]: [66000, 1008.0045351473927],
        [Sound.BS_9]: [69000, 1008.0045351473927],
        [Sound.MEL_1]: [72000, 1008.0045351473927],
        [Sound.MEL_10]: [75000, 1008.0045351473927],
        [Sound.MEL_11]: [78000, 1008.0045351473927],
        [Sound.MEL_12]: [81000, 1008.0045351473927],
        [Sound.MEL_2]: [84000, 1008.0045351473927],
        [Sound.MEL_3]: [87000, 1008.0045351473927],
        [Sound.MEL_4]: [90000, 1008.0045351473927],
        [Sound.MEL_5]: [93000, 1008.0045351473927],
        [Sound.MEL_6]: [96000, 1008.0045351473927],
        [Sound.MEL_7]: [99000, 1008.0045351473927],
        [Sound.MEL_8]: [102000, 1008.0045351473927],
        [Sound.MEL_9]: [105000, 1008.0045351473927],
        [Sound.FX_1]: [108000, 1008.0045351473927],
        [Sound.FX_10]: [111000, 1008.0045351473927],
        [Sound.FX_11]: [114000, 1008.0045351473927],
        [Sound.FX_12]: [117000, 1008.0045351473927],
        [Sound.FX_2]: [120000, 1008.0045351473927],
        [Sound.FX_3]: [123000, 1008.0045351473927],
        [Sound.FX_4]: [126000, 1008.0045351473927],
        [Sound.FX_5]: [129000, 1008.0045351473927],
        [Sound.FX_6]: [132000, 1008.0045351473927],
        [Sound.FX_7]: [135000, 1008.0045351473927],
        [Sound.FX_8]: [138000, 1008.0045351473927],
        [Sound.FX_9]: [141000, 1008.0045351473927],
        [Sound.AMBIENT_1]: [144000, 1008.0045351473927],
        [Sound.AMBIENT_10]: [147000, 1008.0045351473927],
        [Sound.AMBIENT_11]: [150000, 1008.0045351473927],
        [Sound.AMBIENT_12]: [153000, 1008.0045351473927],
        [Sound.AMBIENT_2]: [156000, 1008.0045351473927],
        [Sound.AMBIENT_3]: [159000, 1008.0045351473927],
        [Sound.AMBIENT_4]: [162000, 1008.0045351473927],
        [Sound.AMBIENT_5]: [165000, 1008.0045351473927],
        [Sound.AMBIENT_6]: [168000, 1008.0045351473927],
        [Sound.AMBIENT_7]: [171000, 1008.0045351473927],
        [Sound.AMBIENT_8]: [174000, 1008.0045351473927],
        [Sound.AMBIENT_9]: [177000, 1008.0045351473927],
        [Sound.TRADITIONAL_1]: [180000, 1008.0045351473927],
        [Sound.TRADITIONAL_10]: [183000, 1008.0045351473927],
        [Sound.TRADITIONAL_11]: [186000, 1008.0045351473927],
        [Sound.TRADITIONAL_12]: [189000, 1008.0045351473927],
        [Sound.TRADITIONAL_13]: [192000, 1008.0045351473927],
        [Sound.TRADITIONAL_2]: [195000, 1008.0045351473927],
        [Sound.TRADITIONAL_3]: [198000, 1008.0045351473927],
        [Sound.TRADITIONAL_4]: [201000, 1008.0045351473927],
        [Sound.TRADITIONAL_5]: [204000, 1008.0045351473927],
        [Sound.TRADITIONAL_6]: [207000, 1008.0045351473927],
        [Sound.TRADITIONAL_7]: [210000, 1008.0045351473927],
        [Sound.TRADITIONAL_8]: [213000, 1008.0045351473927],
        [Sound.TRADITIONAL_9]: [216000, 1008.0045351473927],
      },
      onload: () => {
        resolve(soundSource)
      },
    })
  })
}

export default createSoundSource
