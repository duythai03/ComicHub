import { useEffect, useState } from "react";

function useDebounce(value, delay, cleanup) {
	const [debounceValue, setDebounceValue] = useState(value);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		const handler = setTimeout(() => {
			setDebounceValue(value);
			setIsLoading(false);
		}, delay);

		return () => {
			if (cleanup) {
				cleanup(setDebounceValue);
			}
			clearTimeout(handler);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	return {
		isLoading,
		debounceValue,
	};
}

export default useDebounce;
