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
        new Sprite("static/assets/platform_wood_1.png", "platform-1"),
        new Sprite("static/assets/background.png", "background"),
        new Sprite("static/assets/jar.png", "jar"),
        new Sprite("static/assets/drawer.png", "drawer"),
        new Sprite("static/assets/water.png", "water"),
        new Sprite("static/assets/Peak Shit.png", "shit"),
        new Sprite("static/assets/Potion Blue/potion_blue_1.png", "potion-blue"),
        new Sprite("static/assets/Potion Yellow/potion_yellow0.png", "potion-yellow")
        // new Sprite("assets/sprite_boeken_0.png", "boeken-1"),
        // new Sprite("assets/sprite_boeken_1.png", "boeken-2")
    ]

    addAnim("static/assets/fly_1_flying/fly_1_flying", "fly1_", 6);
    addAnim("static/assets/fly_1_idle/fly_1_idle", "idle1_", 3);
    addAnim("static/assets/fly_1_jumpup/fly_1_jumpup", "jump1_", 3);
    addAnim("static/assets/fly_1_walk/fly_1_walk", "walk1_", 6);

    addAnim("static/assets/fly_2_flying/fly_2_flying", "fly2_", 6);
    addAnim("static/assets/fly_2_idle/fly_2_idle", "idle2_", 3);
    addAnim("static/assets/fly_2_jumpup/fly_2_jumpup", "jump2_", 3);
    addAnim("static/assets/fly_2_walk/fly_2_walk", "walk2_", 6);

}


