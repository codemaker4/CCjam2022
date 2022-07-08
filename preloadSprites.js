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
        new Sprite("assets/platform_wood_1.png", "platform-1")
    ]
}


