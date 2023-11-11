import Phaser from 'phaser'

import HelloWorldScene from './scene'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'app',
    scene: [HelloWorldScene],
    pixelArt: false,
    scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
}

export default new Phaser.Game(config)
