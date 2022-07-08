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
        fill(255);
        stroke(0);
        strokeWeight(2);
        image(this.sprite, this.pos.x - this.size.x/2, this.pos.y - this.size.y/2, this.size.x, this.size.y)
    }
}