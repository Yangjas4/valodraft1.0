
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const uri = "mongodb+srv://user:123@valodraft.cccr4is.mongodb.net/ValodraftDB?retryWrites=true&w=majority";
const server = http.createServer(app);
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

const checkRoomExists = async (roomid) => {
    try {
        console.log(await Room.exists({ roomid: roomid }));
        return await Room.exists({ roomid: roomid });
    } catch (err) {
        console.log(err);
    }
}

const newRoom = async (roomid, socketid) => {
    try {
        const newRoom = new Room({ roomid: roomid, team1: socketid });
        await newRoom.save();
        console.log("new room at "+ roomid);
    } catch (err) {
        console.log(err);
    }
}

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

app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected ${socket.id}`);

    socket.on("get message", (message) => {
        console.log(message);
    })

    socket.on("join room", async (roomid) => {
        console.log('hi');
        if (await checkRoomExists(roomid)) {
            socket.join(roomid);
        } else {
            console.log('new room ' + roomid);
            await newRoom(roomid, socket.id);
        }
    })
})

mongoose.connection.once('open', () => {
    console.log("connected to MongoDB");
    server.listen(3000, () => { console.log("SERVER IS RUNNING"); })
})