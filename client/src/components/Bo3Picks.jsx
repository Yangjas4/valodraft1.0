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
						d="M0 1H1049"
						stroke="#F25454"
						strokeWidth="2"
						strokeLinecap="round"
						initial={{ pathLength: 0 }}
						animate={{ pathLength: 1 }}
					/>
					<motion.path d="M148.367 0L148.367 225.288" stroke="#F25454" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
					<motion.path d="M299.69 0L299.69 225.288" stroke="#F25454" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
					<motion.path d="M450.583 0L450.583 225.288" stroke="#F25454" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
					<motion.path d="M602.644 0L602.644 225.288" stroke="#F25454" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
					<motion.path d="M753.092 0L753.092 225.288" stroke="#F25454" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
					<motion.path d="M903.092 0L903.092 225.288" stroke="#F25454" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
				</svg>
				<div className="cards-container-bo3">
					<div className="bo3-col"><div className="bo3-card-wrap"><MapBanCard map={props.ban1} /></div></div>
					<div className="bo3-col"><div className="bo3-card-wrap"><MapBanCard map={props.ban2} /></div></div>
					<div className="bo3-col"><div className="bo3-card-wrap"><MapPickCard map={props.map1} defender={props.defender1} picker="b" /></div></div>
					<div className="bo3-col"><div className="bo3-card-wrap"><MapPickCard map={props.map2} defender={props.defender2} picker="a" /></div></div>
					<div className="bo3-col"><div className="bo3-card-wrap"><MapBanCard map={props.ban3} /></div></div>
					<div className="bo3-col"><div className="bo3-card-wrap"><MapBanCard map={props.ban4} /></div></div>
					<div className="bo3-col"><div className="bo3-card-wrap"><MapPickCard map={props.decider} defender="" picker="b" /></div></div>
				</div>
			</div>
			<h1>
				YOU ARE <span className="blue">{props.team.toUpperCase()}</span>
			</h1>
		</div>
	);
}
