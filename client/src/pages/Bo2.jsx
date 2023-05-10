import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Linkshare from "../components/Linkshare";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Bo2Picks from "../components/Bo2Picks";
import loading from "../assets/loading.gif";


export default function Bo2() {

    const params = useParams();
    const roomid = params.id;
	let body;
	const [socket, setSocket] = useState();
	const [roomState, setRoomState] = useState();
	let userid;

	useEffect(() => {
		const s = io("http://localhost:3001");
		setSocket(s);

		return () => {
			s.disconnect();
		}
	}, [])

	useEffect(() => {
		if (socket == undefined || roomState == undefined) return;

		userid = socket.id;
		console.log("hello");
		socket.once("load room", room => {
			setRoomState(room);
		})

		socket.emit("get room", roomid);
	}, [socket, roomState, roomid]);

	useEffect(() => {
		if (roomState === undefined || socket === undefined) return;

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
	}, [socket, roomState]);
	

	return (
		<>
			<Navbar />
			{body}
			<Footer />
		</>
	);
}
