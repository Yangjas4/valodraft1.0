import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Linkshare from "../components/Linkshare";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Bo2Picks from "../components/Bo2Picks";
import BanModal from "../components/BanModal";
import PickModal from "../components/PickModal";
import SidesModal from "../components/SidesModal";
import { AnimatePresence } from "framer-motion";

export default function Bo2() {
	const params = useParams();
	const roomid = params.id;
	const [body, setBody] = useState();
	let socket;
	const [roomState, setRoomState] = useState();
	const [socketId, setSocketId] = useState();
	const [team, setTeam] = useState("");
	const [picking, setPicking] = useState(false);
	const [banning, setBanning] = useState(false);
	const [sideChoice, setSideChoice] = useState(false);

	function handlePick(map) {
		console.log(map);
		setPicking(false);
	}

	function handleBan(map) {
		console.log(map);
		setBanning(false);
	}

	function handleSideChoice() {
		setSideChoice(false);
	}

	useEffect(() => {
		socket = io("http://localhost:3001");
		console.log("socket connected");
		socket.emit("get room", roomid);

		return () => {
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		if (socket == undefined) return;

		console.log("socket defined");
		socket.on("load room", (room) => {
			setRoomState(room);
		});

		socket.on("connect", () => {
			setSocketId(socket.id);
			console.log(socketId);
		});
	}, [socket]);

	useEffect(() => {
		if (roomState === undefined) return;

		let unsidedMap = "ascent";

		if (roomState.maps[0] !== "") {
			unsidedMap = roomState.maps[0];
		} else if (roomState.maps[1] !== "") {
			unsidedMap = roomState.maps[1];
		}

		if (!roomState.draftStart) {
			setBody(<Linkshare />);
		} else if (roomState.draftStart) {
			if (socketId === roomState.teamA) {
				setTeam("team a");
			} else if (socketId === roomState.teamB) {
				setTeam("team b");
			} else {
				setTeam("spectating");
			}
			console.log(roomState);
			console.log(socketId);
			console.log(team);
			setBody(
				<>
					<div className="bo2-container">
						<h2>Map Veto</h2>
						<Bo2Picks
							team={team}
							map1={roomState.maps[0]}
							map2={roomState.maps[1]}
							ban1={roomState.mapsBanned[0]}
							ban2={roomState.mapsBanned[1]}
							defender1={roomState.defender[0]}
							defender2={roomState.defender[1]}
						/>
						{picking && (
							<AnimatePresence>
								<PickModal
									mapsRemaining={roomState.mapsRemaining}
									handleClick={handlePick}
								/>
							</AnimatePresence>
						)}
						{banning && (
							<AnimatePresence>
								<BanModal
									mapsRemaining={roomState.mapsRemaining}
									handleClick={handleBan}
								/>
							</AnimatePresence>
						)}
						{sideChoice && (
							<AnimatePresence>
								<SidesModal
									currentMap={unsidedMap}
									handleClick={handleSideChoice}
								/>
							</AnimatePresence>
						)}
					</div>
				</>
			);
		}

		if (roomState.mapsBanned[0] === "" && roomState.teamA === socketId) {
			console.log(setRoomState.teamA === socketId);
			setBanning(true);
		} else if (
			roomState.mapsBanned[0] !== "" &&
			roomState.mapsBanned[1] === "" &&
			roomState.teamB === socketId
		) {
			setBanning(true);
		} else if (
			roomState.mapsBanned[0] !== "" &&
			roomState.mapsBanned[1] !== "" &&
			roomState.maps[0] === "" &&
			roomState.teamA === socketId
		) {
			setPicking(true);
		} else if (
			roomState.mapsBanned[0] !== "" &&
			roomState.mapsBanned[1] !== "" &&
			roomState.maps[0] !== "" &&
			roomState.defender[0] === "" &&
			roomState.teamB === socketId
		) {
			setSideChoice(true);
		} else if (
			roomState.mapsBanned[0] !== "" &&
			roomState.mapsBanned[1] !== "" &&
			roomState.maps[0] !== "" &&
			roomState.maps[1] === "" &&
			roomState.teamB === socketId
		) {
			setPicking(true);
		} else if (
			roomState.mapsBanned[0] !== "" &&
			roomState.mapsBanned[1] !== "" &&
			roomState.maps[0] !== "" &&
			roomState.maps[1] !== "" &&
			roomState.defender[1] === "" &&
			roomState.teamA === socketId
		) {
			setSideChoice(true);
		}
	}, [roomState, team, picking, banning, sideChoice]);

	return (
		<>
			<Navbar />
			{body}
			<Footer />
		</>
	);
}
