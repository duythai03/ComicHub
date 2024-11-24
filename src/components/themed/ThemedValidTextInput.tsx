import { ThemedTextInputProps } from "./ThemedTextInput";
import ThemedMessageTextInput from "./ThemedMessageTextInput";

export type ThemedValidTextInputProps = ThemedTextInputProps & {
	errorMessage?: string;
	lightColor?: string;
	darkColor?: string;
};

export default function ThemedValidTextInput({
	errorMessage,
	style,
	value,
	onChangeText,
	lightColor,
	darkColor,
	...props
}: ThemedValidTextInputProps) {
	return (
		<ThemedMessageTextInput
			value={value}
			onChangeText={onChangeText}
			messageType="error"
			message={errorMessage}
			lightColor={lightColor}
			darkColor={darkColor}
			style={style}
			{...props}
		/>
	);
}
