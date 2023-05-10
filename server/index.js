const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*" } });

//mongoose
const mongoose = require("mongoose");
const uri = "mongodb+srv://user:123@valodraft.cccr4is.mongodb.net/ValodraftDB?retryWrites=true&w=majority";
const roomSchema = new mongoose.Schema({
    roomid: String,
    teamA: String,
    teamB: String,
    mapsRemaining: [String],
    maps: [String],
    mapsTeamA: [String],
    mapsBanned: [String],
    draftStart: String
})

const VetoRoom = mongoose.model('VetoRoom', roomSchema);

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

//helper functions
async function checkRoomExists(room) {
    try {
        const match = await VetoRoom.exists({ roomid: room });
        return match;
    } catch (err) {
        console.log(err);
    }
}

const newRoom = async (roomid, socketid) => {
    try {
        const newRoom = new VetoRoom({ roomid: roomid, teamA: socketid, teamB: "", mapsRemaining: [], maps: [], mapsTeamA: [], mapsBanned: [], drafStart: "false" });
        await newRoom.save();
        console.log("new room with id: " + roomid);
    } catch (err) {
        console.log(err);
    }
}

//socket.io
io.on("connection", (socket) => {
    console.log("user connected: " + socket.id);

    socket.on("join room", async (roomid) => {

        socket.join(roomid);

        if (await checkRoomExists(roomid)) {
            const room = await VetoRoom.findOne({ roomid: roomid});
            if (room.teamB === '') {
                room.teamB = socket.id;
                room.draftStart = "true";
                await room.save();
                socket.to(roomid).emit("fetch room", room);
            }
        } else {
            newRoom(roomid, socket.id)
            const doc = await VetoRoom.findOne({ roomid: roomid });
            socket.to(roomid).emit("fetch room", doc);
        }
    });

    socket.on("hi", (roomid) => {
        socket.to(roomid).emit("hi", "hello");
    }) 
})
