const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "http://127.0.0.1:5173/bo2",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected ${socket.id}`);
})

server.listen(3000, () => {
    console.log("SERVER IS RUNNING");
})