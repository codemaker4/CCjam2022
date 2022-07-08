let thisPlayerName1 = `player#${Math.floor(Math.random()*10000)}`;
let thisPlayerName2 = `player#${Math.floor(Math.random()*10000)}`;

let world;

const countdown = 30
let remainingtime = countdown
const updateFrames = 60

function setup() {
    createCanvas(innerWidth, innerHeight);

    world = new World();
    water = new Water(world.size.y);

    world.platforms = [
        new Platform(createVector(world.size.x/2, world.size.y), createVector(world.size.x*0.9, 20), getSprite("platform-1")),
        new Platform(createVector(250, 500), createVector(200, 32), getSprite("platform-1")),
        new Platform(createVector(850, 450), createVector(186/2, 32), getSprite("drawer")),
        new Platform(createVector(500, 550), createVector(186/2, 32), getSprite("drawer")),
        new Platform(createVector(400, 300), createVector(200, 32), getSprite("platform-1")),
        new Platform(createVector(world.size.x/2, 150), createVector(186/2, 32), getSprite("drawer"))
    ];

    setTimeout(() => {
        world.players.push(new Player(1, thisPlayerName1, world.size.x/3, 500, 0, 0));
        world.players.push(new Player(2, thisPlayerName2, world.size.x/3 *2, 500, 0, 0));
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
    resizeCanvas(innerWidth, innerHeight);
    redraw();
}

function draw() {
    background(123);
    translate(width/2, height/2);
    scale(Math.min(width/world.size.x, height/world.size.y));
    translate(-world.size.x/2, -world.size.y/2)
    image(getSprite("background"), 0,0, world.size.x, world.size.y);
    noFill();
    stroke(0);
    strokeWeight(2);
    rect(0, 0, world.size.x, world.size.y);
    world.tick();
    world.draw();
    water.draw();

    if(frameCount % updateFrames == 0){
        doPlayerUpdate(JSON.stringify(world.getPlayer(thisPlayerName1)))
    }

    if(frameCount % 60 == 0 && countdown - frameCount / 60 >=0){
        remainingtime = countdown - frameCount / 60
        
    }
    if(countdown - frameCount / 60 <0){
        waterSpeed = 0.3
    }

    image(getSprite("shit"), world.size.x/2 - 32, 75, 64, 64)

    textSize(32);
        fill(200, 200, 200)
        text(remainingtime, world.size.x/2, 50)

  }
