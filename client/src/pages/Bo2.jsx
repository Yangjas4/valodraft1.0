import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Linkshare from "../components/Linkshare";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Bo2Picks from "../components/Bo2Picks";
import loading from "../assets/loading.gif";

const socket = io("http://localhost:3001");

export default function Bo2() {

    const params = useParams();
    const roomid = params.id;
	let body;
	const [draftStart, setDraftStart] = useState("loading");

    useEffect(() => {
        console.log(socket);
        socket.emit("join room", {roomid: roomid, bo: 2});
        socket.emit("get room state", roomid);
        console.log("joined room: " + roomid);
    }, []);

    useEffect(() => {
        socket.on("start veto", (roomInfo) => {
			if (roomid === roomInfo.roomid && draftStart === false) {
				console.log(roomInfo);
				setDraftStart(true);
			}
        });

		socket.on("set room state", (roomState) => {
			if (roomid === roomState.roomid) {
				console.log(roomState.state)
				setDraftStart(roomState.state);
			}
		})
    }, [socket]);
	if (draftStart === "loading") {
		body = <></>
	}
	else if (!draftStart) {
		body = <Linkshare />;
	} else {
		body = <Bo2Picks />;
	}

	return (
		<>
			<Navbar />
			{body}
			<Footer />
		</>
	);
}
