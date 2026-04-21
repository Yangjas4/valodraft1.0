const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*" } });
const compMaps = ["bind", "breeze", "fracture", "haven", "lotus", "pearl", "split"]
//mongoose
const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;
const roomSchema = new mongoose.Schema({
    roomid: String,
    teamA: String,
    teamB: String,
    mapsRemaining: [String],
    maps: [String],
    defender: [String],
    mapsBanned: [String],
    draftStart: Boolean,
    type: { type: String, default: "bo2" }
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
    server.listen(process.env.PORT || 3001, () => {
        console.log("SERVER IS RUNNING");
    })
})



//socket.io
io.on("connection", (socket) => {
    console.log("user connected: " + socket.id);

    socket.on("get room", async (data) => {
        const roomid = typeof data === "string" ? data : data.roomid;
        const type = typeof data === "object" && data.type ? data.type : "bo2";

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
            room = await newRoom(roomid, socket.id, type);
        }
        socket.join(roomid);
        io.to(roomid).emit("load room", room);
    });

    socket.on("ban map", async ({ roomid, map }) => {
        const room = await VetoRoom.findOne({ roomid });
        if (!room) return;
        const idx = room.mapsBanned.findIndex(m => m === "");
        if (idx === -1) return;
        room.mapsBanned[idx] = map;
        room.mapsRemaining = room.mapsRemaining.filter(m => m !== map);
        room.markModified('mapsBanned');
        room.markModified('mapsRemaining');

        // Bo3: auto-fill decider after all bans are done
        if (room.type === "bo3" && room.mapsBanned.every(m => m !== "") && room.mapsRemaining.length === 1) {
            const deciderIdx = room.maps.findIndex(m => m === "");
            if (deciderIdx !== -1) {
                room.maps[deciderIdx] = room.mapsRemaining[0];
                room.mapsRemaining = [];
                room.markModified('maps');
                room.markModified('mapsRemaining');
            }
        }

        await room.save();
        io.to(roomid).emit("load room", room);
    });

    socket.on("pick side", async ({ roomid, side }) => {
        const room = await VetoRoom.findOne({ roomid });
        if (!room) return;
        const myTeam = socket.id === room.teamA ? "a" : "b";
        const opposingTeam = myTeam === "a" ? "b" : "a";
        const defendingTeam = side === "defender" ? myTeam : opposingTeam;
        const idx = room.defender.findIndex(d => d === "");
        if (idx === -1) return;
        room.defender[idx] = defendingTeam;
        room.markModified('defender');
        await room.save();
        io.to(roomid).emit("load room", room);
    });

    socket.on("pick map", async ({ roomid, map }) => {
        const room = await VetoRoom.findOne({ roomid });
        if (!room) return;
        const idx = room.maps.findIndex(m => m === "");
        if (idx === -1) return;
        room.maps[idx] = map;
        room.mapsRemaining = room.mapsRemaining.filter(m => m !== map);
        room.markModified('maps');
        room.markModified('mapsRemaining');
        await room.save();
        io.to(roomid).emit("load room", room);
    });
})



async function checkRoomExists(room) {
    try {
        const match = await VetoRoom.exists({ roomid: room });
        return match;
    } catch (err) {
        console.log(err);
    }
}

const newRoom = async (roomid, socketid, type = "bo2") => {
    try {
        const maps = type === "bo3" ? ["", "", ""] : ["", ""];
        const defender = type === "bo3" ? ["", "", ""] : ["", ""];
        const mapsBanned = type === "bo3" ? ["", "", "", ""] : ["", ""];
        const room = new VetoRoom({
            roomid, teamA: socketid, teamB: "",
            mapsRemaining: compMaps, maps, defender, mapsBanned,
            draftStart: false, type
        });
        await room.save();
        console.log("new room with id: " + roomid);
        return room;
    } catch (err) {
        console.log(err);
    }
}
