class Platform {
    constructor(pos, size, sprite) {
        this.pos = pos;
        this.size = size;
        this.sprite = sprite;
    }

    get halfSize() {
        return this.size.copy().div(2);
    }

    draw() {
        for (let xOff = 0; xOff < this.size.x; xOff += this.sprite.width/2) {
            image(
                this.sprite,
                this.pos.x-this.halfSize.x+xOff, // x
                this.pos.y-this.halfSize.y, // y
                min(this.sprite.width, this.size.x-xOff), // width
                this.size.y, // height
                0, // source x
                0, // source y
                min(this.sprite.width, this.size.x-xOff), // source width
                this.size.y*2, // source height
            )
        }

        noFill();
        stroke(255, 127);
        strokeWeight(5);
        rect(
            this.pos.x - this.size.x/2,
            this.pos.y - this.size.y/2,
            this.size.x,
            this.size.y
        );
    }
}