class Player {
    constructor(world, id, pos, vel, color, holdButtons = [], pressButtons = []) {
        this.world = world; // the world object this player is in.
        this.id = id; // float number 0 - 1, made with Math.random()
        this.pos = pos; // p5 vector
        this.vel = vel; // p5 vector
        this.size = createVector(20,20);
        this.color = color; // p5 color temporary
        this.holdButtons = holdButtons; // array of strings representing buttons
        this.pressButtons = pressButtons; // array of strings representing buttons, cleared every frame
    }

    buttonDown(buttonName) {
        if (!this.holdButtons.includes(buttonName)) {
            this.holdButtons.push(buttonName);
            this.pressButtons.push(buttonName);
        }
    }

    buttonUp(buttonName) {
        let i = this.holdButtons.indexOf(buttonName);
        if (i) {
            this.pressButtons.splice(i, 1);
        } else {
            console.log(`released button ${buttonName} while it wasn't pressed`);
        }
    }

    tick() {
        this.vel.mult(0.9);
        this.vel.y += 0.1;
        if (this.pressButtons.includes("up")) this.vel.y = -1;
        if (this.holdButtons.includes("left")) this.vel.x = -1;
        if (this.holdButtons.includes("right")) this.vel.x = 1; 
        this.pos.add(this.vel);

        this.pressButtons = [];
    }

    draw() {
        fill(this.color);
        stroke(0);
        strokeWeight(2);
        fillRect(this.pos.x - this.size.x/2, this.pos.y - this.size.y/2, this.size.x, this.size.y);
    }
}