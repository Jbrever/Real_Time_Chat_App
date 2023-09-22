const http = require('http')
const express = require('express')
const {Server} = require('socket.io')  //step 1
const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 8000;
const path = require('path')

app.use(express.static('public'))

const io = new Server(server)          //step 2nd

io.on('connection',(socket)=>{         //step 3rd socket.io msg recieve from index.js
    
 socket.on('msg',(msg)=>{
    socket.broadcast.emit('msg',msg)   // send msg to index.js
 })                                 
 
})                                     //step 4th followed in index.html
                                       //step 5th followed in index.js
                                       //step 6th followed in index.js

app.get('/',(req,resp)=>{
   resp.sendFile('index.html')
})


server.listen(port , ()=>{
    console.log(`connect at port number http://localhost:${port}/ `)
})

