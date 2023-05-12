import ascent from "../assets/Ascent.svg";
import bind from "../assets/Bind.svg";
import breeze from "../assets/Breeze.svg";
import fracture from "../assets/Fracture.svg";
import haven from "../assets/Haven.svg";
import icebox from "../assets/Icebox.svg";
import lotus from "../assets/Lotus.svg";
import pearl from "../assets/Pearl.svg";
import split from "../assets/Split.svg";

export default function MapPickCard(props) {
	let card;

	switch (props.map) {
		case "ascent":
			card = ascent;
			break;
		case "bind":
			card = bind;
			break;
		case "breeze":
			card = breeze;
			break;
		case "fracture":
			card = fracture;
			break;
		case "haven":
			card = haven;
			break;
		case "icebox":
			card = icebox;
			break;
		case "lotus":
			card = lotus;
			break;
		case "pearl":
			card = pearl;
			break;
		case "split":
			card = split;
			break;
        default:
            card = '';
            break;
	}

	return (
		<div className="card-container">
			<img src={card} />
            {props.map != "" && <p>Team {props.defender.toUpperCase()} Picks Defender</p>}
		</div>
	);
}
