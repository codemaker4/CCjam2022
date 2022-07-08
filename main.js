let players = [];
let thisPlayerName = `player#${Math.floor(Math.random()*10000)}`;

let world;

const updateFrames = 60

function setup() {
    createCanvas(windowWidth, windowHeight);

    world = new World();

    world.platforms = [
        new Platform(createVector(world.size.x/2, world.size.y), createVector(world.size.x*0.9, 20), getSprite("platform-1")),
        new Platform(createVector(world.size.x/2, world.size.y / 4 * 3), createVector(200, 32), getSprite("platform-1"))

    ];

    setTimeout(() => {
        world.players.push(new Player(thisPlayerName, createVector(world.size.x/2, 200), createVector(0,0), color('blue')));
        socket.emit("newPlayer", thisPlayerName);
    }, 1000);
}

const KEY_CODES = {
    87: "up",
    83: "down",
    65: "left",
    68: "right"
}

function keyPressed() {
    let player = world.getPlayer(thisPlayerName);
    if (player) {
        if (KEY_CODES[keyCode]) {
            player.buttonDown(KEY_CODES[keyCode]);
        }
    }
}

function keyReleased() {
    let player = world.getPlayer(thisPlayerName);
    if (player) {
        if (KEY_CODES[keyCode]) {
            player.buttonUp(KEY_CODES[keyCode]);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    redraw();
}

function draw() {
    background(255);
    scale(0.8);
    noFill();
    stroke(0);
    strokeWeight(2);
    rect(0, 0, world.size.x, world.size.y);
    world.tick();
    world.draw();

    if(frameCount % updateFrames == 0){
        playerUpdate(JSON.stringify(world.getPlayer(thisPlayerName)))
    }
  }