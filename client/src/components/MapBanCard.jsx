import ascent from "../assets/AscentBan.svg";
import bind from "../assets/BindBan.svg";
import breeze from "../assets/BreezeBan.svg";
import fracture from "../assets/FractureBan.svg";
import haven from "../assets/HavenBan.svg";
import icebox from "../assets/IceboxBan.svg";
import lotus from "../assets/LotusBan.svg";
import pearl from "../assets/PearlBan.svg";
import split from "../assets/SplitBan.svg";

export default function MapBanCard(props) {
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
			card = "";
			break;
	}

	return (
		<div className="card-container">
			<img src={card} />
		</div>
	);
}
