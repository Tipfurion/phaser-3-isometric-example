interface CreateTileParams {
    isoX: number
    isoY: number
    isoZ: number
    scene: Phaser.Scene
    imageName: string
}
export class Tile {
    public scene: Phaser.Scene
    public image: Phaser.GameObjects.Image
    public width: number
    public height: number
    public origin: number = 0.25
    public depth: number = 0

    private isoX: number
    private isoY: number
    private isoZ: number
    constructor(params: CreateTileParams) {
        this.scene = params.scene
        this.isoX = params.isoX
        this.isoY = params.isoY
        this.isoZ = params.isoZ
        const { x, y } = this.getWorldCoords()
        this.image = this.scene.add.image(x, y, params.imageName)
        this.width = this.image.width
        this.height = this.image.height
        this.image.setOrigin(0.5, this.origin)
        this.projectToWorldCoords()
    }
    get x() {
        return this.isoX
    }
    set x(v) {
        this.isoX = v
        this.projectToWorldCoords()
    }
    get y() {
        return this.isoY
    }
    set y(v) {
        this.isoY = v
        this.projectToWorldCoords()
    }
    get z() {
        return this.isoZ
    }
    set z(v) {
        this.isoZ = v
        this.projectToWorldCoords()
    }
    public getWorldCoords() {
        const x = (this.isoX - this.isoY) * (this.width * 0.5)
        const y = (this.isoX + this.isoY) * (this.height * this.origin) - this.isoZ * (this.height * 0.5)
        return { x, y }
    }
    private getDepth() {
        return this.isoX + this.isoY + this.isoZ * 1.25
    }
    private projectToWorldCoords() {
        const { x, y } = this.getWorldCoords()
        this.image.x = x
        this.image.y = y
        this.depth = this.getDepth()
        this.image.setDepth(this.depth)
    }
    rotate(mode: 'left' | 'right') {
        const startX = this.isoX
        const newX = mode === 'left' ? -this.y : this.y
        const newY = mode === 'left' ? startX : -startX
        this.x = newX
        this.y = newY
    }
}
