class Water {
    constructor(y, size, sprite) {
        this.y = y;
    }

    get halfSize() {
        return this.size.copy().div(2);
    }

    draw() {
        for (let xOff = 0; xOff < this.size.x; xOff += this.sprite.width/2) {
            image(
                getSprite(water),
                world.size.x/2, // x
                this.y, // y
                world.size.x, // width
                world.size.y, // height
                0, // source x
                0, // source y
                min(this.sprite.width, this.size.x-xOff)*2, // source width
                this.size.y*2, // source height
            )
        }
    }
}