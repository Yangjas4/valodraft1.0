import ModalCard from "./ModalCard";
import { motion } from "framer-motion";

export default function PickModal(props) {
	console.log(props.mapsRemaining);
	const maps = props.mapsRemaining;

	const cards = maps.map((m) => <ModalCard map={m} key={m} handleClick={props.handleClick}/>);
	console.log(cards);
	return (
		<motion.div
			className="pick-modal-container"
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
			exit={{ scale: 0 }}
		>
			<div className="pick-modal-text">
				<h1>
					YOUR TURN TO <span id="light">PICK</span>
				</h1>
			</div>
			<div className="pick-modal-maps">{cards}</div>
		</motion.div>
	);
}
