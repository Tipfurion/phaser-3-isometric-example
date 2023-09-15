interface CreateTileParams {
    isoX: number
    isoY: number
    isoZ: number
}

export class Tile {
    public isoX: number
    public isoY: number
    public isoZ: number
    constructor(params: CreateTileParams) {
        this.isoX = params.isoX
        this.isoY = params.isoY
        this.isoZ = params.isoZ
    }
}
