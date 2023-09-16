import Phaser from 'phaser'
import { Tile } from './tile'
let r = 0
export default class HelloWorldScene extends Phaser.Scene {
    constructor() {
        const sceneConfig = {
            key: 'IsoInteractionExample',
            pixelArt: true,
        }

        super(sceneConfig)
    }

    preload() {
        this.load.image('tile', '../images/Sidewalk_Chunk_trimmed.png')
        this.load.image('cube', '../images/cube.png')
        this.load.image('crate', '../images/isoCrate.png')
        this.load.image('d-cube', '../images/isoCube.png')
    }

    create() {
        var cam = this.cameras.main

        this.input.on('pointermove', function (p) {
            if (!p.isDown) return

            cam.scrollX -= (p.x - p.prevPosition.x) / cam.zoom
            cam.scrollY -= (p.y - p.prevPosition.y) / cam.zoom
        })
        this.input.on(
            'wheel',
            function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
                cam.zoom = cam.zoom - deltaY * 0.0003
            }
        )
        /*  for (let x = 0; x < MAP_SIZE_X; x++) {
            for (let y = 0; y < MAP_SIZE_Y; y++) {
                for (let z = 0; z < MAP_SIZE_Z; z++) {
                    this.createIsometricTile(x, y, z)
                }
            }
        }
        
        this.createIsometricTile(1, 2, 2) */
        const player = new Tile({
            scene: this.scene.scene,
            isoX: 2,
            isoY: 2,
            isoZ: 1,
            imageName: 'd-cube',
        })
        player.image.setTint(0xbf96da)
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                for (let z = 0; z < 10; z++) {
                    const tile = new Tile({
                        scene: this.scene.scene,
                        isoX: x,
                        isoY: y,
                        isoZ: z,
                        imageName: 'd-cube',
                    })

                    tile.image.setInteractive()
                    tile.image.on('pointerdown', async (pointer, x, y) => {
                        /*  player.image.setDepth(999999)
                        await player.smoothChangePosition(
                            tile.x,
                            tile.y,
                            player.z
                        ) */
                        //player.image.setDepth(player.depth)
                        console.log('tile', tile.x, tile.y, tile.z)
                    })
                    setInterval(async () => {
                        tile.rotate()
                        player.rotate()
                    }, 1000)
                    /*   setInterval(() => {
                        tile.rotate()
                        player.rotate()
                    }, 6000) */
                }
            }
        }
    }
    update(time: number, delta: number): void {}
}
