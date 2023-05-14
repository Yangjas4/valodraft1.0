const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*" } });
const compMaps = ["bind", "split", ]
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
        let room;
        if (await checkRoomExists(roomid)) {

            room = await VetoRoom.findOne({ roomid: roomid });
            console.log("doc: " + room);
            if (room.teamB === '') {
                room.teamB = socket.id;
                room.draftStart = true;
                await room.save();
            }
            console.log("room exists joining room: " + roomid)
        } else {
            console.log("room doesn't exist, creating new room in mongodb");
            room = await newRoom(roomid, socket.id);
        }
        socket.join(roomid);
        io.to(roomid).emit("load room", room);

        // socket.on()
    });

    socket.on("update room", async (roomState) => {
        console.log("updating room");
        room = await VetoRoom.findOne({ roomid: roomState.roomid});
        room = roomState;
        await room.save();
        io.to(roomid).emit("load room", room);
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

const newRoom = async (roomid, socketid) => {
    try {
        const newRoom = new VetoRoom({ roomid: roomid, teamA: socketid, teamB: "", mapsRemaining: [], maps: [], mapsTeamA: [], mapsBanned: [], drafStart: false });
        await newRoom.save();
        console.log("new room with id: " + roomid);
        return newRoom;
    } catch (err) {
        console.log(err);
    }
}