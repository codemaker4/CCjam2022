let players = [];
let thisPlayerName = `player#${Math.floor(Math.random()*10000)}`;

let world;

function setup() {
    createCanvas(windowWidth, windowHeight);

    world = new World();

    world.platforms = [
        new Platform(createVector(world.size.x/2, world.size.y), createVector(world.size.x*0.9, 20))
    ];
}

setTimeout(() => {
    world.players.push(new Player(world, thisPlayerName, createVector(world.size.x/2, 200), createVector(0,0), color('blue')));
}, 2000);

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    redraw();
}

function draw() {
    background(255);
    scale(0.5);
    fill(0,0,0,0);
    stroke(0);
    strokeWeight(2);
    rect(0, 0, world.size.x, world.size.y);
    world.tick();
    world.draw();
  }