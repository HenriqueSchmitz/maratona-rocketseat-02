const express = require('express')
const server = express()
const router = require('./routes')
const path = require('path')

//Enable static files
server.use(express.static("public"))

//Enable express server to use EJS
server.set("view engine", "ejs") 

// Change the location of the views folder
server.set("views", path.join(__dirname,"views"))

// Enable request body
server.use(express.urlencoded({ extended: true }))

server.use(router)

server.listen(3000, () => {console.log(`Running...`)})