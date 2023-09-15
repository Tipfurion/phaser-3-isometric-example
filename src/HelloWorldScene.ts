import Phaser from 'phaser'
const TILE_WIDTH = 79 // Width of tile image
const TILE_HEIGHT = 92 // Height of tile image
const TILE_ORIGIN = 0.25 // Center of tile top

const MAP_SIZE_X = 10
const MAP_SIZE_Y = 20
const MAP_SIZE_Z = 1

const getTileDepth = (x, y, z) => x + y + z * 1.25
const getTileY = (x, y, z) =>
    (x + y) * (TILE_HEIGHT * TILE_ORIGIN) - z * (TILE_HEIGHT * 0.5)

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
        for (let x = 0; x < MAP_SIZE_X; x++) {
            for (let y = 0; y < MAP_SIZE_Y; y++) {
                for (let z = 0; z < MAP_SIZE_Z; z++) {
                    this.createIsometricTile(x, y, z)
                }
            }
        }
        this.createIsometricTile(1, 2, 2)
    }
    update(time: number, delta: number): void {}

    createIsometricTile(x, y, z) {
        const tilePositionX = (x - y) * (TILE_WIDTH * 0.5)
        const tilePositionY = getTileY(x, y, z)
        const tileDepth = getTileDepth(x, y, z)

        const tile = this.add.image(tilePositionX, tilePositionY, 'd-cube')
        tile.setInteractive()
        tile.on('pointerover', function () {
            this.setTint(0xbf96da)
            this.z = this.z + 0.5
            this.y = getTileY(x, y, this.z)
        })

        tile.on('pointerout', function () {
            this.clearTint()
            this.z = this.z - 0.5
            this.y = getTileY(x, y, this.z)
        })
        /*  tile.on('pointerdown', function () {
            console.log('this', this)
            this.z = this.z + 1
            this.y = this.y - this.z
            //this.setDepth(getTileDepth(this.x, this.y, this.z))
        }) */

        tile.setOrigin(0.5, TILE_ORIGIN)
        tile.setDepth(tileDepth)
    }
}
