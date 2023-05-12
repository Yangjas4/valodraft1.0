const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*" } });

//mongoose
const mongoose = require("mongoose");
const uri = "mongodb+srv://user:123@valodraft.cccr4is.mongodb.net/ValodraftDB?retryWrites=true&w=majority";
const roomSchema = new mongoose.Schema({
    id: String,
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
        io.to(roomid).emit("load room", room);

        // socket.on()
    })
})

async function findOrCreateRoom(id, socket) {
    if (id === null) return;

    let result = await VetoRoom.find({id: id});
    console.log(`room: ${room}`);
    if (result.length > 0) {
        let room = result[0]
        if (room.teamB === "") {
            room = {...room, teamB: socket, draftStart: true};
            room.save();
            return room;
        }
        return room;
    } else {
        return await VetoRoom.create({ id: id, teamA: socket, teamB: "", mapsRemaining: [], maps: [], mapsTeamA: [], mapsBanned: [], drafStart: "false" });
    }
   
}