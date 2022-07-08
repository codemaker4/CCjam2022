let staticSprites = []

class Sprite{
    constructor(path, name){
        this.path = path
        this.name = name
        this.img = loadImage(this.path)
        console.log(path, name);
    }
}

function addAnim(path, name, count) {
    for (let i = 0; i < count; i++) {
        staticSprites.push(new Sprite(`${path}${i}.png`, `${name}${i}`));
    }
}

function getSprite(name) {
    return staticSprites.find(sprite => sprite.name == name).img
}

function preload(){
    staticSprites = [
        new Sprite("assets/platform_wood_1.png", "platform-1"),
        new Sprite("assets/background.png", "background"),
        new Sprite("assets/jar.png", "jar"),
        new Sprite("assets/drawer.png", "drawer"),
        new Sprite("assets/water.png", "water")
    ]

    addAnim("assets/fly_1_flying/fly_1_flying", "fly_", 6);
    addAnim("assets/fly_1_idle/fly_1_idle", "idle_", 3);
    addAnim("assets/fly_1_jumpup/fly_1_jumpup", "jump_", 3);
    addAnim("assets/fly_1_walk/fly_1_walk", "walk_", 6);

}


