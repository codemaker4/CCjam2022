class Player {
    constructor(name, x, y, dx, dy, holdButtons = [], pressButtons = []) {
        this.name = name; // float number 0 - 1, made with Math.random()
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.sizeX = 60;
        this.sizeY = 60;
        this.holdButtons = holdButtons; // array of strings representing buttons
        this.pressButtons = pressButtons; // array of strings representing buttons, cleared every frame
        this.framesSinceOnGround = 100000; // the amount of frames since the last ground collision.
    }

    buttonDown(buttonName) {
        if (!this.holdButtons.includes(buttonName)) {
            this.holdButtons.push(buttonName);
            this.pressButtons.push(buttonName);
        }
    }

    buttonUp(buttonName) {
        console.log();
        if (this.holdButtons.includes(buttonName)) {
            this.holdButtons.splice(this.holdButtons.indexOf(buttonName), 1);
        } else {
            console.log(`released button ${buttonName} while it wasn't pressed`);
        }
    }

    tick(world) {
        this.dx *= 0.5;
        this.dy += 0.8;
        if (this.holdButtons.includes("up") && this.framesSinceOnGround < 5) this.dy = -20;
        if (this.holdButtons.includes("left")) this.dx -= 8;
        if (this.holdButtons.includes("right")) this.dx += 8;
        
        this.x += this.dx;
        this.y += this.dy;

        for (const platform of world.platforms) {
            if (
                this.x + this.sizeX/2 > platform.pos.x - platform.halfSize.x && 
                this.x - this.sizeX/2 < platform.pos.x + platform.halfSize.x &&
                this.y + this.sizeY/2 > platform.pos.y - platform.halfSize.y &&
                this.y - this.sizeY/2 < platform.pos.y + platform.halfSize.y
            ) {
                console.log(`collision between ${this.name} and platform ${platform}`);
                if (this.y < platform.pos.y && this.dy > 0) { // player on top of platform and going down
                    this.framesSinceOnGround = 0;
                    this.y = platform.pos.y - platform.halfSize.y - this.sizeY/2;
                    this.dy = min(this.dy, 0);
                }
            }
        }

        this.framesSinceOnGround += 1;
        this.pressButtons = [];
    }

    draw() {
        fill('blue');
        stroke(0);
        strokeWeight(2);
        image(getSprite("player1"), this.x - this.sizeX/2, this.y - this.sizeY/2, this.sizeX, this.sizeY);
    }
}