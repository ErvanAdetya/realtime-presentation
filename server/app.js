'use strict'

const express = require('express')
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

let nowurl;

io.on('connection', (socket) => {
    console.log('Connected with client')
    // socket.emit('welcome')
    socket.emit('change', nowurl)

    socket.on('addlist', (response) => {
        socket.emit('addlist', response.text)
        socket.broadcast.emit('addlist', response.text)        
    })
    socket.on('change', (response) => {
        nowurl = response;
        socket.emit('change', response)
        socket.broadcast.emit('change' , response)        
    })
})

server.listen(3000, () => {
    console.log('Server listening to PORT 3000');
})