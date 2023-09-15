interface CreateTileParams {
    isoX: number
    isoY: number
    isoZ: number
    scene: Phaser.Scene
}
const TILE_WIDTH = 79 // Width of tile image
const TILE_HEIGHT = 92 // Height of tile image
const origin = 0.25 // Center of tile top
export class Tile {
    public scene: Phaser.Scene
    public image: Phaser.GameObjects.Image
    public width: number
    public height: number
    public origin: number = 0.25

    private isoX: number
    private isoY: number
    private isoZ: number
    private depth: number = 0
    constructor(params: CreateTileParams) {
        this.scene = params.scene
        this.isoX = params.isoX
        this.isoY = params.isoY
        this.isoZ = params.isoZ

        const { x, y } = this.getSceneCoords()
        this.image = this.scene.add.image(x, y, 'd-cube')
        this.width = this.image.width
        this.height = this.image.height

        this.image.setOrigin(0.5, origin)

        this.projectToSceneCoords()
    }
    get x() {
        return this.isoX
    }
    set x(v) {
        this.isoX = v
        this.projectToSceneCoords()
    }
    get y() {
        return this.isoY
    }
    set y(v) {
        this.isoY = v
        this.projectToSceneCoords()
    }
    get z() {
        return this.isoZ
    }
    set z(v) {
        this.isoZ = v
        this.projectToSceneCoords()
    }
    private getDepth() {
        return this.isoX + this.isoY + this.isoZ * 1.25
    }
    private getSceneCoords() {
        const x = (this.isoX - this.isoY) * (TILE_WIDTH * 0.5)
        const y =
            (this.isoX + this.isoY) * (TILE_HEIGHT * origin) -
            this.isoZ * (TILE_HEIGHT * 0.5)
        return { x, y }
    }
    private projectToSceneCoords() {
        const { x, y } = this.getSceneCoords()
        this.image.x = x
        this.image.y = y
        this.depth = this.getDepth()
    }
    public smoothChangePosition(x, y, z) {}
}
