import { useEffect, useRef } from "react";
import useWindowSize from "./useWindowSize";

export default function useMousePosition() {
	const position = useRef();
	const windowSize = useWindowSize();

	useEffect(() => {
		const handleMouseMove = (e) => {
			let x = e.clientX / windowSize.width - 0.5;
			let y = e.clientY / windowSize.height - 0.5;

			position.current = { x: x, y: y };
		};
		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, [windowSize.height, windowSize.width]);

	return position;
}
