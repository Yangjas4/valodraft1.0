import "./App.css";
import Landing from "./pages/Landing";
import Bo2 from "./pages/Bo2";
import Bo3 from "./pages/Bo3";
import { SocketContext, socket } from "./context/socket";

import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
	return (
		<>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Landing />} />
						<Route path="bo2/:id" element={<Bo2 />} />
						<Route path="bo3/:id" element={<Bo3 />} />
					</Routes>
				</BrowserRouter>
		</>
	);
}
