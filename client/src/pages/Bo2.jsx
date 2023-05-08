import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Linkshare from "../components/Linkshare";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Bo2Picks from "../components/Bo2Picks";

const socket = io("http://localhost:3000", { autoConnect: false });

export default function Bo2() {

    const params = useParams();
    const roomid = params.id;
	let body;
	const [draftStart, setDraftStart] = useState(false);

    useEffect(() => {
        console.log(socket);
        socket.emit("join room", roomid);
        console.log("joined room: " + roomid);
        socket.emit("get message", "hello");
    }, []);

    useEffect(() => {
        socket.on("start veto", () => {
            setDraftStart(true);
        })
    }, [socket]);

	if (!draftStart) {
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
