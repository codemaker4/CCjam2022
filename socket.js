const ipAdress = "localhost:3000"

const baseURL = "http://" + ipAdress
const socketURL = "ws://" + ipAdress

// get data from local storage
// const gamecode = localStorage.getItem("gamecode")
// const nickname = localStorage.getItem("nickname")
const gamecode = "defaultGame"
const nickname = "nickname"

// connect to websocket via socket.io
const socket = io(socketURL, {query: "gameCode=" + gamecode})


function doPlayerUpdate(playerData){
    socket.emit("playerUpdate", playerData)

}

socket.on("playerUpdate", (gameData) => {
    console.log("updated players")
    updatePlayers(gameData)
})


function updatePlayers(gameData){
    gameData.forEach(player => {
        player = JSON.parse(player)
        playerObj = world.getPlayer(player["name"])

        console.log(player.pos, playerObj.pos)
        world.getPlayer(player["name"])["pos"].set(player["pos"])
        // world.getPlayer(player["name"])["vel"] = player["vel"]
        // world.getPlayer(player["name"])["size"] = player["size"]
        // world.getPlayer(player["name"])["color"] = player["color"]
        // world.getPlayer(player["name"])["holdButtons"] = player["holdButtons"]
        // world.getPlayer(player["name"])["pressButtons"] = player["pressButtons"]
        // world.getPlayer(player["name"])["framesSinceOnGround"] = player["framesSinceOnGround"]
    })

}