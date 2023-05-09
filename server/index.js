const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*", methods: ["GET", "POST"] } });

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

const newRoom = async (roomid, socketid, bo) => {
    try {
        const newRoom = new VetoRoom({ roomid: roomid, team1: socketid, team2: "", mapsRemaining: [], map1: "", map2: "", map3: "", map1Team1: "", map2Team1: "", map3Team1: "", mapsBanned: "", bo: bo, drafStart: false });
        await newRoom.save();
        console.log("new room with id: " + roomid);
    } catch (err) {
        console.log(err);
    }
}

//socket.io
io.on("connection", (socket) => {
    console.log("user connected: " + socket.id);

    socket.on("join room", async (roomInfo) => {
        console.log(socket.id + " joined room " + roomInfo.roomid);

        if (await checkRoomExists(roomInfo.roomid)) {
            socket.join(roomInfo.roomid);

            const doc = await VetoRoom.findOne({ roomid: roomInfo.roomid });
            console.log("doc: " + doc);
            if (doc.team2 === '') {
                doc.team2 = socket.id;
                doc.draftStart = true;
                await doc.save();
                socket.emit("start veto", doc);
            }
            console.log("room exists joining room: " + roomInfo.roomid)
            socket.emit("set room state", { state: doc.draftStart, roomid: doc.roomid });
        } else {
            console.log("room doesn't exist, creating new room in mongodb");
            await newRoom(roomInfo.roomid, socket.id, roomInfo.bo);
            socket.join(roomInfo.roomid);
            socket.emit("set room state", { state: false, roomid: roomInfo.roomid });
        }

        socket.emit("set room state", { state: doc.draftStart, roomid: doc.roomid });
    });

})
