const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*" } });

//mongoose
const mongoose = require("mongoose");
const uri = "mongodb+srv://user:123@valodraft.cccr4is.mongodb.net/ValodraftDB?retryWrites=true&w=majority";
const roomSchema = new mongoose.Schema({
    roomid: String,
    team1: String,
    team2: String,
    mapsRemaining: [String],
    map1: String,
    map2: String,
    map3: String,
    map1Team1: String,
    map2Team1: String,
    map3Team1: String,
    mapsBanned: [String],
    bo: Number,
    draftStart: Boolean
})

const Room = mongoose.model('Room', roomSchema);

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
        });
    } catch (err) {
        console.log(err);
    }
}

connectDB()

mongoose.connection.once('open', () => {
    console.log("connected to MongoDB");
    server.listen(3001, () => {
        console.log("SERVER IS RUNNING");
    })
})

const checkRoomExists = async (roomid) => {
    try {
        return await Room.exists({ roomid: roomid });
    } catch (err) {
        console.log(err);
    }
}

//socket.io
io.on("connection", (socket) => {
    console.log("user connected: " + socket.id);

    socket.on("join room", async (roomid) => {
        console.log(socket.id + " joined room " + roomid);
        if (await checkRoomExists()) {
            socket.join(roomid);
        } else {
            console.log("room doesn't exist");
        }
    })
})