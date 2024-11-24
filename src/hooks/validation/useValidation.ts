import { useState } from "react";

export type Validator = (value: string) => string | null;

export type CustomMessageValidator = {
	validator: Validator;
	errorMessage?: string;
};

export function withMessage(
	validator: Validator,
	errorMessage: string,
): CustomMessageValidator {
	return { validator, errorMessage };
}

export function allValid(...erroreds: Boolean[]) {
	return erroreds.every((b) => !b);
}

export function validateAll(...validators: (() => Boolean)[]) {
	return validators.filter((v) => v()).length == validators.length;
}

export default function useValidation(
	initialValue: string,
	validators: Validator[] | CustomMessageValidator[] = [],
	lazy: Boolean = false,
) {
	const [value, setValue] = useState(initialValue);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const validate = (inputValue: string) => {
		for (let validator of validators) {
			let defaultMessage;
			if (
				typeof validator === "object" &&
				(validator as CustomMessageValidator).validator !== undefined
			) {
				defaultMessage = validator.errorMessage;
				validator = validator.validator;
			}
			const errorMessage = (validator as Validator)(inputValue);
			if (errorMessage) {
				setErrorMessage(defaultMessage || errorMessage);
				return false;
			}
		}
		setErrorMessage(null);
		return true;
	};

	const onChangeText = (text: string) => {
		setValue(text);
		if (!lazy) {
			validate(text);
		}
	};

	return {
		value,
		onChangeText,
		errored: errorMessage !== null,
		errorMessage,

		// You can call this to validate it late if lazy is set to true,
		validate: (v: string) => validate(v || value),
	};
}
