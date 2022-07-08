class World {
    constructor() {
        this.size = createVector(1152, 642);
        this.platforms = []; // array of platform objects;
        this.players = []; // array of player objects
    }

    getPlayer(name) {
        return this.players.find(player => player.name == name);
    }

    tick() {
        for (let i = 0; i < this.players.length; i++) {
            const player = this.players[i];
            player.tick();
        }
    }

    draw() {
        for (let i = 0; i < this.platforms.length; i++) {
            const platform = this.platforms[i];
            platform.draw();
        }
        for (let i = 0; i < this.players.length; i++) {
            const player = this.players[i];
            player.draw();
        }
    }
}