import cancel from "../assets/cancel.png";
import linkshareButton from "../assets/linkshareButton.png";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import copyclipboard from "../assets/copyclipboard.png";

export default function Linkshare(props) {
	const navigate = useNavigate();
	const [copied, setCopied] = useState(false);

	function handleCancel() {
		navigate("/");
	}

	function handleCopy() {
		setCopied(true);
		navigator.clipboard.writeText(window.location.href);
	}

	return (
		<motion.div className="linkshare-container" initial={{opacity: 0}} animate={{opacity: 100}} transition={{duration: .5}}>
			<div className="linkshare-box">
				<h1>WAITING FOR OPPOSING TEAM...</h1>
				<h2>
					Please invite an opposing player to your room using the link
					below
				</h2>
				<div className="link-box">
					<h3>INVITE URL:</h3>
					<div className="link-container">
						<input
							type="text"
							value={window.location.href}
							class="field left"
							readonly="readonly"
							id="linkinput"
                            onClick={() => handleCopy()}
						/>
						<motion.img
							src={linkshareButton}
							alt="copy link"
							whileHover={{ scale: 1.1 }}
							onClick={() => handleCopy}
						/>
					</div>
					<motion.div
						whileHover={{ scale: 1.05 }}
						className="cancel-button"
						onClick={() => handleCancel()}
					>
						<img src={cancel} alt="x" />
						<p>CANCEL</p>
					</motion.div>
					<AnimatePresence>
						{copied && <motion.img
                            initial={{opacity: 0}}
                            animate={{opacity: 100}}
                            transition={{duration: .5}}
                            exit={{opacity: 0}}
							src={copyclipboard}
							alt="copied to clipboard"
							id="copyclipboard"
						/>}
					</AnimatePresence>
				</div>
			</div>
		</motion.div>
	);
}
