import ThemedTextInput, { ThemedTextInputProps } from "./ThemedTextInput";
import ThemedText from "./ThemedText";
import ThemedView from "./ThemedView";
import { Style } from "nativewind/dist/style-sheet/runtime";
import { useThemeColor } from "@/theme/useThemeColor";

export type ThemedMessageTextInputProps = ThemedTextInputProps & {
	messageType: "info" | "error" | "warning" | "success";
	message?: string;
	lightColor?: string;
	darkColor?: string;
};

export default function ThemedMessageTextInput({
	messageType,
	message,
	style,
	value,
	lightColor,
	darkColor,
	onChangeText,
	...props
}: ThemedMessageTextInputProps) {
	const color = useThemeColor(messageType, {
		light: lightColor,
		dark: darkColor,
	});

	const {
		width,
		minWidth,
		margin,
		marginTop,
		marginBottom,
		marginLeft,
		marginRight,
		marginHorizontal,
		marginVertical,
		...inputStyle
	} = (Object.assign({}, ...(style as Style[]).filter(Boolean)) as Style) || {};

	return (
		<ThemedView
			style={[
				{
					width,
					minWidth,
					margin,
					marginTop,
					marginBottom,
					marginLeft,
					marginRight,
					marginHorizontal,
					marginVertical,
				},
			]}
		>
			<ThemedTextInput
				value={value}
				onChangeText={onChangeText}
				style={[
					message ? { borderColor: color } : undefined,
					inputStyle,
					{
						marginBottom: 14,
					},
				]}
				{...props}
			/>
			{message && (
				<ThemedText style={{ color, lineHeight: 16, fontSize: 16 }}>
					{message}
				</ThemedText>
			)}
		</ThemedView>
	);
}
