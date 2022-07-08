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

socket.on("newPlayer", (name) => {
    console.log("new player")
})


function updatePlayers(gameData){
    gameData.forEach(player => {
        // player = JSON.parse(player)
        // playerObj = world.getPlayer(player["name"])
        console.log(player)
        // playerObj.x = player.x;
        for (const property of ["x", "y", "dx", "dy"]) {
            world.getPlayer(player["name"])[property] = player[property];
        }
    })
}