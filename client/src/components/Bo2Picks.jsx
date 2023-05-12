import { motion, AnimatePresence } from "framer-motion";
import MapPickCard from "./MapPickCard";
import MapBanCard from "./MapBanCard";

export default function Bo2Picks(props) {
	return (
		<>
			<div className="bo2-mapui-container">
				<div className="pick-titles">
					<motion.h4
						className="map-ban"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					>
						Team A Ban
					</motion.h4>
					<motion.h4
						className="map-ban"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					>
						Team B Ban
					</motion.h4>
					<motion.h4
						className="map-pick"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					>
						Team A Pick
					</motion.h4>
					<motion.h4
						className="map-pick"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					>
						Team B Pick
					</motion.h4>
				</div>
				<div className="bo2-map-table">
					<svg
						width="884"
						height="332"
						viewBox="0 0 884 332"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						id="bo2grid"
					>
						<motion.path
							d="M2 1.5H882"
							stroke="#F25454"
							stroke-width="3"
							stroke-linecap="round"
							initial={{ pathLength: 0 }}
							animate={{ pathLength: 1 }}
						/>
						<motion.path
							d="M217.5 2L217.5 330"
							stroke="#F25454"
							stroke-width="3"
							stroke-linecap="round"
							initial={{ pathLength: 0 }}
							animate={{ pathLength: 1 }}
						/>
						<motion.path
							d="M438 2L438 330"
							stroke="#F25454"
							stroke-width="3"
							stroke-linecap="round"
							initial={{ pathLength: 0 }}
							animate={{ pathLength: 1 }}
						/>
						<motion.path
							d="M659 2L659 330"
							stroke="#F25454"
							stroke-width="3"
							stroke-linecap="round"
							initial={{ pathLength: 0 }}
							animate={{ pathLength: 1 }}
						/>
					</svg>
					<div className="cards-container">
						<div className="ban1 card">
							<MapBanCard map={props.ban1} />
						</div>
						<div className="ban2 card">
							<MapBanCard map={props.ban2} />
						</div>
						<div className="pick1 card">
							<MapPickCard map={props.map1} defender={props.defender1} />
						</div>
						<div className="pick2 card">
							<MapPickCard map={props.map2} defender={props.defender2} />
						</div>
					</div>
				</div>
				<h1>
					{" "}
					YOU ARE <span className="blue">{props.team.toUpperCase()}</span>{" "}
				</h1>
			</div>
		</>
	);
}
