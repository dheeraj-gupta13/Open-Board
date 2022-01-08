const express = require("express");
const socket = require("socket.io");

let app = express();

app.use(express.static("public"));

let port = 3000;
let server = app.listen(port, ()=>{
    console.log("Listening to server "+port);
});


let io = socket(server);

io.on("connection",(socket) => {
    // Received data
    socket.on("beginPath", (data) => {
        // data -> data from front-end.
        // Now, transfer the same data to all connected Systems.
        io.sockets.emit("beginPath", data);
    });


    socket.on("drawStroke", (data) => {
        // data -> data from front-end.
        // Now, transfer the same data to all connected Systems.
        io.sockets.emit("drawStroke", data);
    });


    socket.on("undoRedo", (data) => {
        // data -> data from front-end.
        // Now, transfer the same data to all connected Systems.
        io.sockets.emit("undoRedo", data);
    });
})