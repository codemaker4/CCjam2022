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






// function for all socket connections
io.on('connection', (socket) => {
    // add new connection to game room
    socket.join(socket.handshake.query["gameCode"])
    console.log("New user, room = ", Array.from(socket.rooms)[1])

    socket.on('newPlayer', (name) => {
        const gameCode = Array.from(socket.rooms)[1]
        gameData[gameCode].push({"nickname":name})
        // socket.in(gameCode).emit("newPlayer", name)
    })


    socket.on('playerUpdate', (data) => {
        console.log(data)
        const gameCode = Array.from(socket.rooms)[1]
        gameData[gameCode].forEach(player => {
            if(player.name == data.name){
                player = data
            }
        });
        Object.keys(gameData[gameCode])
        socket.in(gameCode).emit("playerUpdate", gameData[gameCode])
    })
})

// start server
http.listen(3000, () => {
    console.log('listening on *:3000')
})