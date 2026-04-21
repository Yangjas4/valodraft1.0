import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Linkshare from "../components/Linkshare";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Bo3Picks from "../components/Bo3Picks";
import BanModal from "../components/BanModal";
import PickModal from "../components/PickModal";
import SidesModal from "../components/SidesModal";
import { AnimatePresence, motion } from "framer-motion";
import sword from "../assets/sword.png";

export default function Bo3() {
	const params = useParams();
	const roomid = params.id;
	const socketRef = useRef(null);
	const [roomState, setRoomState] = useState();
	const [socketId, setSocketId] = useState();
	const [picking, setPicking] = useState(false);
	const [banning, setBanning] = useState(false);
	const [sideChoice, setSideChoice] = useState(false);
	const [deciderVisible, setDeciderVisible] = useState(false);

	function handlePick(map) {
		socketRef.current.emit("pick map", { roomid, map });
		setPicking(false);
	}

	function handleBan(map) {
		socketRef.current.emit("ban map", { roomid, map });
		setBanning(false);
	}

	function handleSideChoice(side) {
		socketRef.current.emit("pick side", { roomid, side });
		setSideChoice(false);
	}

	useEffect(() => {
		const socket = io("http://localhost:3001");
		socketRef.current = socket;

		socket.on("connect", () => {
			setSocketId(socket.id);
			socket.emit("get room", { roomid, type: "bo3" });
		});

		socket.on("load room", (room) => {
			setRoomState(room);
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		if (!roomState || !socketId) return;

		setBanning(false);
		setPicking(false);
		setSideChoice(false);

		const { mapsBanned, maps, defender, teamA, teamB } = roomState;
		let next = null;

		// Step 1: Team A bans
		if (mapsBanned[0] === "" && teamA === socketId) {
			next = () => setBanning(true);
		// Step 2: Team B bans
		} else if (mapsBanned[0] !== "" && mapsBanned[1] === "" && teamB === socketId) {
			next = () => setBanning(true);
		// Step 3: Team A picks
		} else if (mapsBanned[1] !== "" && maps[0] === "" && teamA === socketId) {
			next = () => setPicking(true);
		// Step 4: Team B picks side for maps[0]
		} else if (maps[0] !== "" && defender[0] === "" && teamB === socketId) {
			next = () => setSideChoice(true);
		// Step 5: Team B picks
		} else if (defender[0] !== "" && maps[1] === "" && teamB === socketId) {
			next = () => setPicking(true);
		// Step 6: Team A picks side for maps[1]
		} else if (maps[1] !== "" && defender[1] === "" && teamA === socketId) {
			next = () => setSideChoice(true);
		// Step 7: Team A bans again
		} else if (defender[1] !== "" && mapsBanned[2] === "" && teamA === socketId) {
			next = () => setBanning(true);
		// Step 8: Team B bans again (decider auto-fills on server after this)
		} else if (mapsBanned[2] !== "" && mapsBanned[3] === "" && teamB === socketId) {
			next = () => setBanning(true);
		// Step 9: Team A picks side for decider
		} else if (mapsBanned[3] !== "" && maps[2] !== "" && defender[2] === "" && teamA === socketId) {
			next = () => setSideChoice(true);
		}

		if (!next) return;
		const timer = setTimeout(next, 1000);
		return () => clearTimeout(timer);
	}, [roomState, socketId]);

	useEffect(() => {
		if (!roomState?.maps[2]) return;
		const timer = setTimeout(() => setDeciderVisible(true), 800);
		return () => clearTimeout(timer);
	}, [roomState?.maps[2]]);

	const team =
		socketId === roomState?.teamA
			? "team a"
			: socketId === roomState?.teamB
			? "team b"
			: "spectating";

	const unsidedMap =
		roomState?.maps[0] !== "" && roomState?.defender[0] === "" ? roomState.maps[0] :
		roomState?.maps[1] !== "" && roomState?.defender[1] === "" ? roomState.maps[1] :
		roomState?.maps[2] !== "" && roomState?.defender[2] === "" ? roomState.maps[2] :
		"ascent";

	const vetoComplete =
		roomState?.mapsBanned[0] !== "" && roomState?.mapsBanned[1] !== "" &&
		roomState?.mapsBanned[2] !== "" && roomState?.mapsBanned[3] !== "" &&
		roomState?.maps[0] !== "" && roomState?.maps[1] !== "" && roomState?.maps[2] !== "" &&
		roomState?.defender[0] !== "" && roomState?.defender[1] !== "" && roomState?.defender[2] !== "";

	const currentTurn = (() => {
		if (!roomState || vetoComplete) return null;
		const { mapsBanned, maps, defender } = roomState;
		if (mapsBanned[0] === "") return { team: "TEAM A", action: "BANNING" };
		if (mapsBanned[1] === "") return { team: "TEAM B", action: "BANNING" };
		if (maps[0] === "") return { team: "TEAM A", action: "PICKING" };
		if (defender[0] === "") return { team: "TEAM B", action: "PICKING SIDES" };
		if (maps[1] === "") return { team: "TEAM B", action: "PICKING" };
		if (defender[1] === "") return { team: "TEAM A", action: "PICKING SIDES" };
		if (mapsBanned[2] === "") return { team: "TEAM A", action: "BANNING" };
		if (mapsBanned[3] === "") return { team: "TEAM B", action: "BANNING" };
		if (maps[2] !== "" && defender[2] === "") return { team: "TEAM A", action: "PICKING SIDES" };
		return null;
	})();

	return (
		<>
			<Navbar />
			{!roomState ? null : !roomState.draftStart ? (
				<Linkshare />
			) : (
				<div className="bo3-container">
					<h2>Map Veto</h2>
					<Bo3Picks
						team={team}
						ban1={roomState.mapsBanned[0]}
						ban2={roomState.mapsBanned[1]}
						map1={roomState.maps[0]}
						map2={roomState.maps[1]}
						ban3={roomState.mapsBanned[2]}
						ban4={roomState.mapsBanned[3]}
						decider={deciderVisible ? roomState.maps[2] : ""}
						defender1={roomState.defender[0]}
						defender2={roomState.defender[1]}
						deciderDefender={roomState.defender[2]}
					/>
					<AnimatePresence mode="wait">
						{vetoComplete ? (
							<motion.div
								key="complete"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 6 }}
								transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
								style={{
									marginTop: "22px",
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									gap: "10px",
								}}
							>
								<motion.img
									src={sword}
									alt=""
									initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
									animate={{ opacity: 1, scale: 1, rotate: 0 }}
									transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
									style={{ width: 28, height: 28 }}
								/>
								<motion.span
									initial={{ opacity: 0, letterSpacing: "0.3em" }}
									animate={{ opacity: 1, letterSpacing: "0.16em" }}
									transition={{ duration: 0.5, delay: 0.2 }}
									style={{
										color: "#F25454",
										fontSize: "12px",
										fontWeight: 500,
										letterSpacing: "0.16em",
									}}
								>
									MAP VETO COMPLETE
								</motion.span>
							</motion.div>
						) : team === "spectating" && currentTurn ? (
							<motion.div
								key="spectating"
								initial={{ opacity: 0, y: 6 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 6 }}
								transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
								style={{
									color: "#a5a5a5",
									fontSize: "13px",
									fontWeight: 400,
									letterSpacing: "0.12em",
									marginTop: "18px",
									display: "flex",
									alignItems: "center",
									gap: "8px",
								}}
							>
								<motion.span
									animate={{ opacity: [1, 0.3, 1] }}
									transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
									style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#a5a5a5" }}
								/>
								{currentTurn.team} IS {currentTurn.action}
							</motion.div>
						) : !picking && !banning && !sideChoice && team !== "spectating" ? (
							<motion.div
								key="waiting"
								initial={{ opacity: 0, y: 6 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 6 }}
								transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
								style={{
									color: "#a5a5a5",
									fontSize: "13px",
									fontWeight: 400,
									letterSpacing: "0.12em",
									marginTop: "18px",
									display: "flex",
									alignItems: "center",
									gap: "8px",
								}}
							>
								<motion.span
									animate={{ opacity: [1, 0.3, 1] }}
									transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
									style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#a5a5a5" }}
								/>
								WAITING FOR OPPONENT
							</motion.div>
						) : null}
					</AnimatePresence>
					<AnimatePresence>
						{picking && (
							<PickModal
								mapsRemaining={roomState.mapsRemaining}
								handleSelect={handlePick}
							/>
						)}
					</AnimatePresence>
					<AnimatePresence>
						{banning && (
							<BanModal
								mapsRemaining={roomState.mapsRemaining}
								handleSelect={handleBan}
							/>
						)}
					</AnimatePresence>
					<AnimatePresence>
						{sideChoice && (
							<SidesModal
								currentMap={unsidedMap}
								handleSelect={handleSideChoice}
							/>
						)}
					</AnimatePresence>
				</div>
			)}
			<Footer />
		</>
	);
}
