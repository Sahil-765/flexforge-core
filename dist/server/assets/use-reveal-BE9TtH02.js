import { useEffect } from "react";
//#region src/hooks/use-reveal.ts
function useReveal() {
	useEffect(() => {
		const els = document.querySelectorAll(".reveal");
		const io = new IntersectionObserver((entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					e.target.classList.add("in-view");
					io.unobserve(e.target);
				}
			});
		}, { threshold: .12 });
		els.forEach((el) => io.observe(el));
		return () => io.disconnect();
	}, []);
}
//#endregion
export { useReveal as t };
