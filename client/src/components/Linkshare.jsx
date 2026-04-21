import cancel from "../assets/cancel.png";
import linkshareButton from "../assets/linkshareButton.png";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Linkshare() {
	const navigate = useNavigate();
	const [copied, setCopied] = useState(false);

	function handleCancel() {
		navigate("/");
	}

	function handleCopy() {
		if (copied) return;
		navigator.clipboard.writeText(window.location.href);
		setCopied(true);
		setTimeout(() => setCopied(false), 1000);
	}

	return (
		<motion.div
			className="linkshare-container"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<div className="linkshare-box">
				<h1>WAITING FOR OPPOSING TEAM...</h1>
				<h2>Please invite an opposing player to your room using the link below</h2>
				<div className="link-box">
					<h3>INVITE URL:</h3>
					<div style={{ position: "relative" }}>
						<div className="link-container">
							<input
								type="text"
								value={window.location.href}
								readOnly
								id="linkinput"
							/>
							{copied ? (
								<div
									style={{
										height: "36px",
										width: "44px",
										borderRadius: "0 6px 6px 0",
										background: "#22c55e",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										flexShrink: 0,
										fontSize: "18px",
										color: "white",
										cursor: "default",
										userSelect: "none",
									}}
								>
									✓
								</div>
							) : (
								<motion.div
									onClick={handleCopy}
									whileTap={{ scale: 1.05 }}
									style={{
										height: "36px",
										width: "44px",
										overflow: "hidden",
										borderRadius: "0 6px 6px 0",
										cursor: "pointer",
										flexShrink: 0,
									}}
								>
									<img
										src={linkshareButton}
										alt="copy link"
										style={{ height: "100%", width: "100%", display: "block", objectFit: "cover" }}
									/>
								</motion.div>
							)}
						</div>

						<AnimatePresence>
							{copied && (
								<motion.p
									key="copied"
									initial={{ opacity: 0, y: -4 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
									style={{
										position: "absolute",
										top: "calc(100% + 6px)",
										left: "45px",
										color: "#F25454",
										fontSize: "12px",
										fontWeight: 500,
										letterSpacing: "0.12em",
										margin: 0,
									}}
								>
									✓ LINK COPIED TO CLIPBOARD
								</motion.p>
							)}
						</AnimatePresence>
					</div>

					<motion.div
						whileHover={{ scale: 1.05 }}
						className="cancel-button"
						onClick={handleCancel}
					>
						<img src={cancel} alt="x" />
						<p>CANCEL</p>
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
}
