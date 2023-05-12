const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*" } });

//mongoose
const mongoose = require("mongoose");
const uri = "mongodb+srv://user:123@valodraft.cccr4is.mongodb.net/ValodraftDB?retryWrites=true&w=majority";
const roomSchema = new mongoose.Schema({
    _id: String,
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


const newRoom = async (roomid, socketid) => {
    try {
        const newRoom = new VetoRoom();
        await newRoom.save();
        console.log("new room with id: " + roomid);
    } catch (err) {
        console.log(err);
    }
}

//socket.io
io.on("connection", (socket) => {
    console.log("user connected: " + socket.id);

    socket.on("get room", async (roomid) => {
        console.log("requesting room");
        const room = await findOrCreateRoom(roomid, socket.id);
        socket.join(roomid);
        console.log(room);
        socket.to(roomid).emit("load room", room);

        // socket.on()
    })
})

async function findOrCreateRoom(id, socket) {
    if (id === null) return;

    const room = await VetoRoom.findById(id);
    if (room) {
        if (room.teamB = '') {
            await VetoRoom.findByIdAndUpdate(id, {teamB: socket, draftStart: true});
            return room;
        }
        return room;
    };
    return await VetoRoom.create({ _id: id, teamA: socket, teamB: "", mapsRemaining: [], maps: [], mapsTeamA: [], mapsBanned: [], drafStart: "false" });
}