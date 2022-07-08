let players = [];
let thisPlayerName = `player#${Math.floor(Math.random()*10000)}`;

let world;

function setup() {
    createCanvas(windowWidth, windowHeight);

    world = new World();

    world.platforms = [
        new Platform(createVector(width/2, height), createVector(width*0.9, 20))
    ];
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    redraw();
}

function draw() {
    background(255);
    scale(0.5);
    rect(0, 0, world.size.x, world.size.y);
    world.draw();
  }