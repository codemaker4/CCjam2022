let thisPlayerName1 = `player#${Math.floor(Math.random()*10000)}`;
let thisPlayerName2 = `player#${Math.floor(Math.random()*10000)}`;


let world;

const updateFrames = 60

function setup() {
    createCanvas(windowWidth, windowHeight);

    world = new World();

    world.platforms = [
        new Platform(createVector(world.size.x/2, world.size.y), createVector(world.size.x*0.9, 20), getSprite("platform-1")),
        new Platform(createVector(world.size.x/2, world.size.y / 4 * 3), createVector(200, 32), getSprite("platform-1")),
        new Platform(createVector(world.size.x/2, world.size.y / 5 * 4), createVector(186/2, 32), getSprite("drawer"))
    ];

    setTimeout(() => {
        world.players.push(new Player(thisPlayerName1, world.size.x/3, 200, 0, 0));
        world.players.push(new Player(thisPlayerName2, world.size.x/3 *2, 200, 0, 0));
        socket.emit("newPlayer", thisPlayerName1);
    }, 1000);
}

const KEY_CODES1 = {
    87: "up",
    83: "down",
    65: "left",
    68: "right",
    32: "space"
}

const KEY_CODES2 = {
    38: "up",
    40: "down",
    37: "left",
    39: "right"
}

function keyPressed() {
    let player1 = world.getPlayer(thisPlayerName1);
    let player2 = world.getPlayer(thisPlayerName2);

    if (player1 && player2) {
        if (KEY_CODES1[keyCode]) {
            player1.buttonDown(KEY_CODES1[keyCode]);
        } else if (KEY_CODES2[keyCode]) {
            player2.buttonDown(KEY_CODES2[keyCode]);
        }
    }
}

function keyReleased() {
    let player1 = world.getPlayer(thisPlayerName1);
    let player2 = world.getPlayer(thisPlayerName2);

    if (player1 && player2) {
        if (KEY_CODES1[keyCode]) {
            player1.buttonUp(KEY_CODES1[keyCode]);
        } else if (KEY_CODES2[keyCode]) {
            player2.buttonUp(KEY_CODES2[keyCode]);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    redraw();
}

function draw() {
    background(123)
    scale(0.8);
    image(getSprite("background"), 0,0, world.size.x, world.size.y);
    noFill();
    stroke(0);
    strokeWeight(2);
    rect(0, 0, world.size.x, world.size.y);
    world.tick();
    world.draw();

    if(frameCount % updateFrames == 0){
        doPlayerUpdate(JSON.stringify(world.getPlayer(thisPlayerName1)))
    }
  }
