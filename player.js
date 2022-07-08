class Player {
    constructor(id, name, x, y, dx, dy, holdButtons = [], pressButtons = []) {
        this.id = id;
        this.name = name; // float number 0 - 1, made with Math.random()
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.animationTimer = 0;
        this.animationType = "fly"; // fly, idle, jump, walk;
        this.direction = "right";
        this.sizeX = 60;
        this.sizeY = 60;
        this.holdButtons = holdButtons; // array of strings representing buttons
        this.pressButtons = pressButtons; // array of strings representing buttons, cleared every frame
        this.framesSinceOnGround = 100000; // the amount of frames since the last ground collision.
    }

    setAnimation(animationType) {
        this.animationTimer = 0;
        this.animationType = animationType;
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
        console.log(this.y);
        if(this.y > water.y){
            console.log(this.id, " died")
            if(this.id == 1){
                window.location.href = 'player2_gewonnen.html';
            }
            if(this.id == 2){
                window.location.href = 'player1_gewonnen.html';
            }


        }

        this.animationTimer += 0.1;
        if (this.framesSinceOnGround < 2 && this.y > 120) {
            this.dx *= 0.5;
        } else {
            this.dx *= 0.9;
        }
        this.dy += 0.8;
        if (this.holdButtons.includes("up") && this.framesSinceOnGround < 2) {
            this.dy = -18;
            this.setAnimation("jump");
            sounds.boink2.play();
        }
        if (this.holdButtons.includes("left")) {
            if (this.framesSinceOnGround < 2 && this.y > 120) {
                this.dx -= 3;
            } else {
                this.dx -= 1;
            }
            this.direction = "left";
        }
        if (this.holdButtons.includes("right")) {
            if (this.framesSinceOnGround < 2 && this.y > 120) {
                this.dx += 3;
            } else {
                this.dx += 1;
            }
            this.direction = "right";
        }
        
        this.x += this.dx;
        this.y += this.dy;

        for (const platform of world.platforms) {
            if (
                this.x + this.sizeX/2 > platform.pos.x - platform.halfSize.x && 
                this.x - this.sizeX/2 < platform.pos.x + platform.halfSize.x &&
                this.y + this.sizeY/2 > platform.pos.y - platform.halfSize.y &&
                this.y - this.sizeY/2 < platform.pos.y + platform.halfSize.y
            ) {
                // console.log(`collision between ${this.name} and platform ${platform}`);
                if (this.y < platform.pos.y && this.dy > 0) { // player on top of platform and going down
                    this.framesSinceOnGround = 0;
                    this.y = platform.pos.y - platform.halfSize.y - this.sizeY/2;
                    this.dy = min(this.dy, 0);
                }
            }
        }

        for (const player of world.players) {
            if (player == this) continue;
            if (
                this.x + this.sizeX/2 > player.x - player.sizeX/2 && 
                this.x - this.sizeX/2 < player.x + player.sizeX/2 &&
                this.y + this.sizeY/2 > player.y - player.sizeX/2 &&
                this.y - this.sizeY/2 < player.y + player.sizeX/2 && 
                this.x < player.x
            ) {
                if (Date.now() > lastBoinkTime + 200) {
                    sounds.boink.play();
                    lastBoinkTime = Date.now();
                }
                let depth = (this.x + this.sizeX/2) - (player.x - player.sizeX/2);
                this.x -= depth/2;
                player.x += depth/2;
                this.dx -= 20;
                player.dx += 20;
            }
        }

        switch (this.animationType) {
            case "idle":
                if (this.framesSinceOnGround > 2) {
                    this.setAnimation("fly");
                } else if (abs(this.dx) > 1) {
                    this.setAnimation("walk");
                } else if (this.animationTimer >= 3) {
                    this.animationTimer = 0;
                }
                break;
            case "walk":
                if (this.framesSinceOnGround > 2) {
                    this.setAnimation("fly");
                } else if (abs(this.dx) < 1) {
                    this.setAnimation("idle");
                } else if (this.animationTimer >= 6) {
                    this.animationTimer = 0;
                }
                break;
            case "jump":
                if (this.dy >= 0) {
                    this.setAnimation("fly");
                } else if (this.animationTimer >= 3) {
                    this.animationTimer = 2;
                }
                break;
            case "fly":
                if (this.framesSinceOnGround < 2) {
                    if (abs(this.dx) > 1) {
                        this.setAnimation("walk");
                    } else {
                        this.setAnimation("idle");
                    }
                } else if (this.animationTimer >= 6) {
                    this.animationTimer = 0;
                }
                break;
        }

        this.framesSinceOnGround += 1;
        this.pressButtons = [];
    }

    draw() {
        push()
        translate(this.x, 0);
        if (this.direction == "left") {
            scale(-1, 1);
        }
        fill('blue');
        stroke(0);
        strokeWeight(2);
        image(
            getSprite(`${this.animationType}${this.id}_${Math.floor(this.animationTimer)}`),
            - this.sizeX/2,
            this.y - this.sizeY/2,
            this.sizeX,
            this.sizeY
        );
        pop();
    }
}