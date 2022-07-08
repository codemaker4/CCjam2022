// import needed packages
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
// const bodyParser = require("body-parser")

// allow cors?
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})


// static files are stored in 'public' folder
app.use(express.static('static'))

// Data object (needs to be moved to database)
let gameData = {
    "defaultGame": []
}

// routes for Home, join and host page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/main.js', (req, res) => {
    res.sendFile(__dirname + '/main.js')
})

app.get('/player.js', (req, res) => {
    res.sendFile(__dirname + '/player.js')
})

app.get('/world.js', (req, res) => {
    res.sendFile(__dirname + '/world.js')
})

app.get('/preloadSprites.js', (req, res) => {
    res.sendFile(__dirname + '/preloadSprites.js')
})

app.get('/socket.js', (req, res) => {
    res.sendFile(__dirname + '/socket.js')
})

app.get('/platform.js', (req, res) => {
    res.sendFile(__dirname + '/platform.js')
})

app.get('/water.js', (req, res) => {
    res.sendFile(__dirname + '/water.js')
})

app.get('/node_modules/socket.io/client-dist/socket.io.js', (req, res) => {
    res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js')
})






// function for all socket connections
io.on('connection', (socket) => {
    // add new connection to game room
    socket.join(socket.handshake.query["gameCode"])
    console.log("New user, room = ", Array.from(socket.rooms)[1])

    socket.on('newPlayer', (name) => {
        console.log("New player ", name)
        // const gameCode = Array.from(socket.rooms)[1]
        // gameData[gameCode].push({"name":name})
        io.emit("newPlayer", name)
    })


    socket.on('playerUpdate', (data) => {
        // const gameCode = Array.from(socket.rooms)[1]
        // data = JSON.parse(data)

        // if(gameData[gameCode].length === 0){
        //     gameData[gameCode].push(data)
        // } else {
        //     for(let i = 0; i < gameData[gameCode].length; i++){
        //         if(gameData[gameCode][i]["name"] == data["name"]){
        //             gameData[gameCode].splice(i)
        //         }
        //         gameData[gameCode].push(data)
        //         console.log(gameData)


        //     }
        //     // gameData[gameCode].forEach(player => {
        //     //     if(player["name"] == data["name"]){
        //     //         gameData[gameCode][player["name"]]
        //     //         console.log(gameData)
        //     //         // console.log(JSON.parse(gameData[gameCode][player])["x"])
        //     //     }
        //     // });
        // }
        // io.emit("playerUpdate", gameData[gameCode])

    })
})

// start server
http.listen(3000, () => {
    console.log('listening on *:3000')
})