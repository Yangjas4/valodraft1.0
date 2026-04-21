import ascent from "../assets/Ascent.svg";
import bind from "../assets/Bind.svg";
import breeze from "../assets/Breeze.svg";
import fracture from "../assets/Fracture.svg";
import haven from "../assets/Haven.svg";
import icebox from "../assets/Icebox.svg";
import lotus from "../assets/Lotus.svg";
import pearl from "../assets/Pearl.svg";
import split from "../assets/Split.svg";
import { motion, AnimatePresence } from "framer-motion";

const mapImages = { ascent, bind, breeze, fracture, haven, icebox, lotus, pearl, split };

export default function MapPickCard(props) {
	const card = mapImages[props.map] ?? "";

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
						<img src={card} style={{ display: "block" }} />

						{/* White flash overlay fades out after card appears */}
						<motion.div
							style={{
								position: "absolute",
								inset: 0,
								background: "white",
								pointerEvents: "none",
							}}
							initial={{ opacity: 0.55 }}
							animate={{ opacity: 0 }}
							transition={{ duration: 0.45, ease: "easeOut" }}
						/>
					</motion.div>
				)}
			</AnimatePresence>
			{props.map !== "" && props.defender !== "" && (
				<motion.p
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
				>
					Team {props.picker.toUpperCase()} picked{" "}
					{props.picker === props.defender ? "Defender" : "Attacker"}
				</motion.p>
			)}
		</div>
	);
}
