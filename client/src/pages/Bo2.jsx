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
	const [roomState, setRoomState] = useState({});

	useEffect(() => {
		socket.emit("join room", roomid);
		console.log("joining room");
		console.log(roomState);
		socket.emit("hi", roomid);
	}, []);

	useEffect(() => {
		socket.on("fetch room", (roomInfo) => {
			console.log("fetching room");
			setRoomState(roomInfo);
		})
		socket.on("hi", (msg) => {
			console.log(msg);
		})
	}, [socket]);

	
	if (roomState.draftStart === "false") {
		body = <Linkshare />;
	} else if (roomState.draftStart === "true"){
		body = (
			<>
				<div className="bo2-container">
					<h2>Map Veto</h2>
					<Bo2Picks team="team b"/>
				</div>
			</>
		);
	}

	return (
		<>
			<Navbar />
			{body}
			<Footer />
		</>
	);
}
