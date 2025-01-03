import { useEffect, useState } from "react";

export const useOsName = () => {
	const [os, setOs] = useState<"macos" | "windows" | "">("");

	useEffect(() => {
		const macPlatforms = /(macintosh|macintel|macppc|mac68k|macos)/i;

		const userAgent = window.navigator.userAgent.toLowerCase();

		setOs(macPlatforms.test(userAgent) ? "macos" : "windows");
	}, []);

	return os;
};

export const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState<{
		width: number;
		height: number;
	}>({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		window.addEventListener("resize", handleResize);

		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);
	return windowSize;
};
