import { motion } from "framer-motion";
import ModalCard from "./ModalCard";

export default function BanModal(props) {
	const maps = props.mapsRemaining;

	const cards = maps.map((m) => <ModalCard map={m} key={m} />);

	return (
		<motion.div
			className="pick-modal-container"
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
			exit={{ scale: 0 }}
		>
			<div className="pick-modal-text">
				<h1>
					YOUR TURN TO <span id="red">BAN</span>
				</h1>
			</div>
			<div className="pick-modal-maps">{cards}</div>
		</motion.div>
	);
}
