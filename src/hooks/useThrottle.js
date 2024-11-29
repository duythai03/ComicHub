import { useState, useEffect } from "react";

export function useThrottle(fn, delay) {
	const [isThrottled, setIsThrottled] = useState(false);

	useEffect(() => {
		if (isThrottled) {
			// When throttled, set a timeout to reset the throttle
			const timer = setTimeout(() => setIsThrottled(false), delay);
			return () => clearTimeout(timer); // Cleanup timer
		}
	}, [isThrottled, delay]);

	const throttledFn = (...args) => {
		if (!isThrottled) {
			fn(...args); // Call the original function
			setIsThrottled(true); // Set throttle state to true
			console.log("Throttled");
		}
	};

	return throttledFn;
}
