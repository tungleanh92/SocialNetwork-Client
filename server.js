const express = require('express');
const path = require('path');

const app = express();
const http = require('http').Server(app);


app.use(express.static('build'));

app.get('/', (req, res) => {
    res.send('server is up and running')
});

// const port = process.env.PORT || 4003;
const PORT = 4003;
const server = require('http').createServer(app);
const options = { /* ... */ };
const io = require('socket.io')(server, options);
// const server = http.createServer(app);
// const io = socketio(server);
io.on("connection", (socket) => {
    console.log("Made socket connection");
    socket.on("log", (data = "zxc") => {
        socket.broadcast.emit("log", data)
    })
    socket.on("disconnect", () => {
        console.log('disconnected');
    });
});
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
})
