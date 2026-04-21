import ascentBan from "../assets/AscentBan.svg";
import bindBan from "../assets/BindBan.svg";
import breezeBan from "../assets/BreezeBan.svg";
import fractureBan from "../assets/FractureBan.svg";
import havenBan from "../assets/HavenBan.svg";
import iceboxBan from "../assets/IceboxBan.svg";
import lotusBan from "../assets/LotusBan.svg";
import pearlBan from "../assets/PearlBan.svg";
import splitBan from "../assets/SplitBan.svg";
import abyssBan from "../assets/AbyssBan.svg";
import sunsetBan from "../assets/SunsetBan.svg";
import corrodeBan from "../assets/CorrodeBan.svg";
import { motion, AnimatePresence } from "framer-motion";

const banMaps = {
	bind: bindBan, breeze: breezeBan, fracture: fractureBan,
	haven: havenBan, lotus: lotusBan, pearl: pearlBan, split: splitBan,
	abyss: abyssBan, sunset: sunsetBan, corrode: corrodeBan, ascent: ascentBan,
};

export default function MapBanCard(props) {
	return (
		<div className="card-container">
			<AnimatePresence>
				{props.map !== "" && (
					<motion.div
						key={props.map}
						style={{ position: "relative" }}
						initial={{ opacity: 0, scale: 1.06, y: 6 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
					>
						<img src={banMaps[props.map]} style={{ display: "block" }} />

						{/* Red flash overlay — stamps in then fades, giving impact to the ban */}
						<motion.div
							style={{
								position: "absolute",
								inset: 0,
								background: "rgba(242, 84, 84, 0.55)",
								pointerEvents: "none",
							}}
							initial={{ opacity: 0 }}
							animate={{ opacity: [0, 0.7, 0] }}
							transition={{ duration: 0.5, delay: 0.25, times: [0, 0.2, 1] }}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
