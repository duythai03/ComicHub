export const isRequired = (value: string, errorMessage?: string) =>
	value.trim() ? null : errorMessage || "This field is required.";

export const isEmail = (value: string, errorMessage?: string) =>
	/^\S+@\S+\.\S+$/.test(value)
		? null
		: errorMessage || "Invalid email address.";

export const minLength =
	(length: number, errorMessage?: string) => (value: string) =>
		value.length >= length
			? null
			: errorMessage || `Must be at least ${length} characters.`;
