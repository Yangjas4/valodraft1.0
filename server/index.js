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
    draftStart: Boolean
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



//socket.io
io.on("connection", (socket) => {
    console.log("user connected: " + socket.id);

    socket.on("get room", async (roomid) => {
        console.log("requesting room");
        if (checkRoomExists(roomid))
        const room = await findOrCreateRoom(roomid, socket.id);
        socket.join(roomid);
        console.log(room);
        io.to(roomid).emit("load room", room);

        // socket.on()
    })
})



async function checkRoomExists(room) {
    try {
        const match = await VetoRoom.exists({ roomid: room });
        return match;
    } catch (err) {
        console.log(err);
    }
}

const newRoom = async (roomid, socketid, bo) => {
    try {
        const newRoom = new VetoRoom({ roomid: roomid, teamA: socketid, teamB: "", mapsRemaining: [], maps: [], mapsTeamA: [], mapsBanned: [], drafStart: false });
        await newRoom.save();
        console.log("new room with id: " + roomid);
    } catch (err) {
        console.log(err);
    }
}