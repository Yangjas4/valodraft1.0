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
	const [socketId, setSocketId] = useState();
	const [team, setTeam] = useState('');
	const [bans, setBans] = useState([]);
	const [picks, setPicks] = useState([]);

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
		socket.on("load room", room => {
			setRoomState(room);
		})

		socket.on("connect", () => {
			setSocketId(socket.id);
			console.log(socketId);
		})
	}, [socket]);


	useEffect(() => {
		if (roomState === undefined) return;


		if (!roomState.draftStart) {
			setBody(<Linkshare />)  
		} else if (roomState.draftStart){
			if (socketId === roomState.teamA) {
				setTeam('team a');
			} else if (socketId === roomState.teamB) {
				setTeam('team b');
			} else {
				setTeam('spectating');
			}
			console.log(roomState);
			console.log(socketId);
			console.log(team);
			setBody((
				<>
					<div className="bo2-container">
						<h2>Map Veto</h2>
						<Bo2Picks team={team} map1="" map2="" ban1="" ban2="" defender1="" defender2=""/>
					</div>
				</>
			)) 
		}

		if (roomState.mapsBanned.length === 0 ) {

		}
	}, [roomState, team]);
	

	return (
		<>
			<Navbar />
			{body}
			<Footer />
		</>
	);
}


