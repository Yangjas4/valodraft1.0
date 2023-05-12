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
	const [body, setBody] = useState();
	let socket;
	const [roomState, setRoomState] = useState();
	let userid;

	useEffect(() => {
		socket = io("http://localhost:3001");
		console.log("socket connected")
		socket.emit("get room", roomid);


		return () => {
			socket.disconnect();
		}
	}, [])

	useEffect(() => {
		if (socket == undefined ) return;

		console.log("socket defined");
		userid = socket.id;
		socket.on("load room", room => {
			setRoomState(room);
			console.log(roomState);
		})

	}, [socket]);


	useEffect(() => {
		
		if (roomState === undefined) return;
		console.log(roomState);
		if (!roomState.draftStart) {
			setBody(<Linkshare />)  
		} else if (roomState.draftStart){
			setBody((
				<>
					<div className="bo2-container">
						<h2>Map Veto</h2>
						<Bo2Picks team="team b"/>
					</div>
				</>
			)) 
		}
	}, [roomState]);
	

	return (
		<>
			<Navbar />
			{body}
			<Footer />
		</>
	);
}
