class Player {
    constructor(name, pos, vel, color, holdButtons = [], pressButtons = []) {
        this.name = name; // float number 0 - 1, made with Math.random()
        this.pos = pos; // p5 vector
        this.vel = vel; // p5 vector
        this.size = createVector(60,60);
        this.color = color; // p5 color temporary
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

    get prevPos() {
        return this.pos.copy().sub(this.vel);
    }

    get halfSize() {
        return this.size.copy().div(2);
    }

    tick(world) {
        this.vel.x *= 0.5;
        this.vel.y += 0.8;
        if (this.holdButtons.includes("up") && this.framesSinceOnGround < 5) this.vel.y = -20;
        if (this.holdButtons.includes("left")) this.vel.x -= 8;
        if (this.holdButtons.includes("right")) this.vel.x += 8;
        this.pos.add(this.vel);

        for (let i = 0; i < world.platforms.length; i++) {
            const platform = world.platforms[i];
            if (
                this.pos.x + this.halfSize.x > platform.pos.x - platform.halfSize.x && 
                this.pos.x - this.halfSize.x < platform.pos.x + platform.halfSize.x &&
                this.pos.y + this.halfSize.y > platform.pos.y - platform.halfSize.y &&
                this.pos.y - this.halfSize.y < platform.pos.y + platform.halfSize.y
            ) {
                console.log(`collision between ${this.name} and platform ${i}`);
                if (this.pos.y < platform.pos.y && this.vel.y > 0) { // player on top of platform and going down
                    this.framesSinceOnGround = 0;
                    this.pos.y = platform.pos.y - platform.halfSize.y - this.halfSize.y;
                    this.vel.y = min(this.vel.y, 0);
                }
            }
        }

        this.framesSinceOnGround += 1;
        this.pressButtons = [];
    }

    draw() {
        fill(this.color);
        stroke(0);
        strokeWeight(2);
        rect(this.pos.x - this.size.x/2, this.pos.y - this.size.y/2, this.size.x, this.size.y);
    }
}