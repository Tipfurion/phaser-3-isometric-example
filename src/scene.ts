import Phaser from 'phaser'
import { Tile } from './tile'
export default class Scene extends Phaser.Scene {
    public tiles: Tile[] = []
    preload() {
        this.load.image('cube', '../images/cube.png')
    }
    create() {
        const q = this.input.keyboard.addKey('Q')
        const e = this.input.keyboard.addKey('E')
        q.on('down', () => {
            this.tiles.forEach((tile) => tile.rotate('left'))
        })
        e.on('down', () => {
            this.tiles.forEach((tile) => tile.rotate('right'))
        })
        const cam = this.cameras.main
        this.input.on('pointermove', (p) => {
            if (!p.isDown) return
            cam.scrollX -= (p.x - p.prevPosition.x) / cam.zoom
            cam.scrollY -= (p.y - p.prevPosition.y) / cam.zoom
        })
        this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
            cam.zoom = cam.zoom - deltaY * 0.0003
        })

        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                for (let z = 0; z < 2; z++) {
                    const tile = new Tile({
                        scene: this.scene.scene,
                        isoX: x,
                        isoY: y,
                        isoZ: z,
                        imageName: 'cube',
                    })
                    if (x === 4 && y === 4 && z === 0) {
                        const { x: centerX, y: centerY } = tile.getWorldCoords()
                        cam.centerOn(centerX, centerY)
                    }
                    this.tiles.push(tile)
                    tile.image.setInteractive()
                    tile.image.on('pointerover', async () => {
                        tile.image.setTint(0xbd85ed)
                    })
                    tile.image.on('pointerout', async () => {
                        tile.image.clearTint()
                    })
                    tile.image.on('pointerdown', async () => {
                        tile.z++
                    })
                }
            }
        }

        for (let x = 20; x < 30; x++) {
            for (let y = 0; y < 10; y++) {
                for (let z = 0; z < 2; z++) {
                    const tile = new Tile({
                        scene: this.scene.scene,
                        isoX: x,
                        isoY: y,
                        isoZ: z,
                        imageName: 'cube',
                    })
                    if (x === 4 && y === 4 && z === 0) {
                        const { x: centerX, y: centerY } = tile.getWorldCoords()
                        cam.centerOn(centerX, centerY)
                    }
                    this.tiles.push(tile)
                    tile.image.setInteractive()
                    tile.image.on('pointerover', async () => {
                        tile.image.setTint(0xbd85ed)
                    })
                    tile.image.on('pointerout', async () => {
                        tile.image.clearTint()
                    })
                    tile.image.on('pointerdown', async () => {
                        tile.z++
                    })
                }
            }
        }
    }
}
