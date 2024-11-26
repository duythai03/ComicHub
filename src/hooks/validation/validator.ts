import { MutableRefObject } from "react";

export const Required = (value: string) => {
	return value.trim() ? null : "This field is required.";
};

export const Email = (value: string) => {
	const regex =
		/^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:\\[\x01-\x7f]|[\x01-\x7f])*")@(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}|(?:\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z-]*[a-zA-Z]:[^\]]+)\]))$/;
	return regex.test(value) ? null : "Invalid email address.";
};
export const MinLength = (length: number) => (value: string) =>
	value.length >= length ? null : `Must be at least ${length} characters.`;

export const MatchValue =
	(getMatchValue: () => MutableRefObject<string>) => (value: string) => {
		return value === getMatchValue().current ? null : "Values do not match.";
	};
