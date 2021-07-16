import { useEffect } from "react";

export default function useMousePosition(element: React.RefObject<HTMLElement>) {
	let position = { x: 0, y: 0 };

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!element.current) return;

			position.x = e.clientX - element.current.getBoundingClientRect().left;
			position.y = e.clientY - element.current.getBoundingClientRect().top;
		};
		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return position;
}
