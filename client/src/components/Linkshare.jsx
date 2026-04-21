import cancel from "../assets/cancel.png";
import linkshareButton from "../assets/linkshareButton.png";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Linkshare() {
	const navigate = useNavigate();
	const [copied, setCopied] = useState(false);
	const [cancelHovered, setCancelHovered] = useState(false);
	const [inputFocused, setInputFocused] = useState(false);

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
								onChange={() => {}}
								id="linkinput"
								onClick={() => setInputFocused(true)}
								onFocus={() => setInputFocused(true)}
								onBlur={() => setInputFocused(false)}
								style={{ caretColor: inputFocused ? "white" : "transparent", cursor: "text" }}
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
										cursor: "default",
										userSelect: "none",
									}}
								>
									<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
										<motion.path
											d="M3 8.5L6.5 12L13 5"
											stroke="white"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
											initial={{ pathLength: 0 }}
											animate={{ pathLength: 1 }}
											transition={{ duration: 0.3, ease: "easeOut" }}
										/>
									</svg>
								</div>
							) : (
								<motion.div
									onClick={handleCopy}
									whileHover={{ scale: 1.06 }}
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
						className="cancel-button"
						onClick={handleCancel}
						onHoverStart={() => setCancelHovered(true)}
						onHoverEnd={() => setCancelHovered(false)}
						whileHover={{ scale: 1.02 }}
						style={{ overflow: "hidden", position: "relative" }}
					>
						<img src={cancel} alt="x" />
						<p>CANCEL</p>
						<motion.div
							initial={{ x: "-150%" }}
							animate={{ x: cancelHovered ? "250%" : "-150%" }}
							transition={cancelHovered ? { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } : { duration: 0 }}
							style={{
								position: "absolute",
								top: 0, left: 0,
								width: "45%",
								height: "100%",
								background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
								pointerEvents: "none",
							}}
						/>
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
}
