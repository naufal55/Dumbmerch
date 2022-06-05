//use express in app variable here

const express = require("express")
const app = express()
//get cors from "C:/Users/ASUS/AppData/Local/Microsoft/TypeScript/4.6/node_modules/@types/cors/index"
const cors = require('cors');
//declare env
require('dotenv').config()
//Get routes to the variabel here
const router =  require("./src/routes")

//define the server port here
const http = require('http')
const {Server} = require('socket.io')

const server = http.createServer(app)
const io = new Server(server, {
 cors: {
     origin: 'http://localhost:3000' // define client origin if both client and server have different origin
 }
})

require('./src/socket')(io) // same with const socketIo=require(./src/...)

const port = 5000

//require socket

app.use(express.json())
app.use(cors());
//create the homepage route here and inside it create res means, response, and it send string "Hello Express!" to the API

//Create endpoint grouping and router here
app.use("/api/v1/", router) //api versi 1
// menampilkan gambar sesuai filepath uploads pada multer
app.use('/uploads', express.static('uploads'))

app.get("/", (req,res) => {
    res.send("Hello World")
})


// add after app initialization

// change app to server
server.listen(port, () => console.log(`Listening on port ${port}!`))
