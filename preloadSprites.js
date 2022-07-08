let staticSprites = {
    platforms: [
        {
            path: "assets/platform_wood_1.png"
        }
    ]
}

let animatedSprites = {

}

function preload() {
    staticSprites.platforms.forEach(platform => {
        platform["img"] = loadImage(platform.path)
    });
}