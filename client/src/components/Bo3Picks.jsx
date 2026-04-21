import { motion } from "framer-motion";
import MapPickCard from "./MapPickCard";
import MapBanCard from "./MapBanCard";

export default function Bo3Picks(props) {
	return (
		<div className="bo3-mapui-container">
			<div className="bo3-pick-titles">
				<motion.h4 className="map-ban" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Team A Ban</motion.h4>
				<motion.h4 className="map-ban" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Team B Ban</motion.h4>
				<motion.h4 className="map-pick" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Team A Pick</motion.h4>
				<motion.h4 className="map-pick" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Team B Pick</motion.h4>
				<motion.h4 className="map-ban" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Team A Ban</motion.h4>
				<motion.h4 className="map-ban" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Team B Ban</motion.h4>
				<motion.h4 className="map-pick" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Decider Map</motion.h4>
			</div>
			<div className="bo3-map-table">
				<svg
					width="1049"
					height="228"
					viewBox="0 0 1049 228"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					id="bo3grid"
				>
					<motion.path
						d="M6.929 1H1042.071"
						stroke="#F25454"
						strokeWidth="2"
						strokeLinecap="round"
						initial={{ pathLength: 0 }}
						animate={{ pathLength: 1 }}
					/>
					<motion.path d="M149.857 0L149.857 225.288" stroke="#F25454" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
					<motion.path d="M299.714 0L299.714 225.288" stroke="#F25454" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
					<motion.path d="M449.571 0L449.571 225.288" stroke="#F25454" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
					<motion.path d="M599.428 0L599.428 225.288" stroke="#F25454" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
					<motion.path d="M749.285 0L749.285 225.288" stroke="#F25454" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
					<motion.path d="M899.142 0L899.142 225.288" stroke="#F25454" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
				</svg>
				<div className="cards-container-bo3">
					<div className="bo3-col"><div className="bo3-card-wrap"><MapBanCard map={props.ban1} /></div></div>
					<div className="bo3-col"><div className="bo3-card-wrap"><MapBanCard map={props.ban2} /></div></div>
					<div className="bo3-col"><div className="bo3-card-wrap"><MapPickCard map={props.map1} defender={props.defender1} picker="b" /></div></div>
					<div className="bo3-col"><div className="bo3-card-wrap"><MapPickCard map={props.map2} defender={props.defender2} picker="a" /></div></div>
					<div className="bo3-col"><div className="bo3-card-wrap"><MapBanCard map={props.ban3} /></div></div>
					<div className="bo3-col"><div className="bo3-card-wrap"><MapBanCard map={props.ban4} /></div></div>
					<div className="bo3-col"><div className="bo3-card-wrap"><MapPickCard map={props.decider} defender={props.deciderDefender} picker="a" /></div></div>
				</div>
			</div>
			<h1>
				YOU ARE <span className="blue">{props.team.toUpperCase()}</span>
			</h1>
		</div>
	);
}
