const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket =>{
    socket.on('musicboard', ({name, message, date})=>{
        io.emit('musicboard', {name, message, date})
        //console.log('music', name, message, date);
    })
})

http.listen(5000, ()=> console.log(`Listening on port 5000`))