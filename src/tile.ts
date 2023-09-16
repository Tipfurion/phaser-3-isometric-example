interface CreateTileParams {
    isoX: number
    isoY: number
    isoZ: number
    scene: Phaser.Scene
    imageName: string
}
const allTiles = []
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

        const { x, y } = this.getSceneCoords()
        this.image = this.scene.add.image(x, y, params.imageName)
        this.width = this.image.width
        this.height = this.image.height

        this.image.setOrigin(0.5, this.origin)

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
        const x = (this.isoX - this.isoY) * (this.width * 0.5)
        const y =
            (this.isoX + this.isoY) * (this.height * this.origin) -
            this.isoZ * (this.height * 0.5)
        return { x, y }
    }
    private projectToSceneCoords() {
        const { x, y } = this.getSceneCoords()
        this.image.x = x
        this.image.y = y
        this.depth = this.getDepth()
        this.image.setDepth(this.depth)
    }
    _rotate() {
        const _x = this.isoX
        this.isoX = this.isoY
        this.isoY = -_x
        this.projectToSceneCoords()
    }
    __rotate() {
        const startX = this.isoX
        const startY = this.isoY

        const newX = this.y
        const newY = -startX

        const xInter = Phaser.Math.Interpolation.SmoothStep(0.5, startX, newX)
    }
    rotate() {
        const startX = this.isoX
        const startY = this.isoY

        const newX = -this.y
        const newY = startX

        this.smoothChangePosition(newX, newY, this.z)
    }
    public async smoothChangePosition(x, y, z) {
        return new Promise((resolve, reject) => {
            const _x = (x - y) * (this.width * 0.5)
            const _y =
                (x + y) * (this.height * this.origin) - z * (this.height * 0.5)
            this.scene.tweens.add({
                targets: this.image,
                x: _x,
                y: _y,
                duration: 1000,
                ease: 'Linear',

                onComplete: () => {
                    this.x = x
                    this.y = y
                    this.z = z
                    this.projectToSceneCoords()
                    resolve(true)
                },
            })
        })
    }
}
