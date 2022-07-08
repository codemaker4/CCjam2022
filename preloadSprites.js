let staticSprites = []

class Sprite{
    constructor(path, name){
        this.path = path
        this.name = name
        this.img = loadImage(this.path)
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
        new Sprite("assets/Nasty Fly CLR 1.png", "player1"),
        new Sprite("assets/Nasty Fly CLR 1.png", "player2")
    ]
}


