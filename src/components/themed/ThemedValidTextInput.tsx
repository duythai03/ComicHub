import ThemedTextInput, { ThemedTextInputProps } from "./ThemedTextInput";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { Style } from "nativewind/dist/style-sheet/runtime";
import { useThemeColor } from "@/theme/useThemeColor";

export type ThemedValidTextInputProps = ThemedTextInputProps & {
	errored?: boolean;
	errorMessage?: string;
};

export default function ThemedValidTextInput({
	errored: error,
	errorMessage,
	style,
	value,
	onChangeText,
	...props
}: ThemedValidTextInputProps) {
	const errorColor = useThemeColor("error");

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
					error && { borderColor: errorColor },
					inputStyle,
					{
						marginBottom: 14,
					},
				]}
				{...props}
			/>
			{error && (
				<ThemedText style={{ color: errorColor, lineHeight: 16, fontSize: 16 }}>
					{errorMessage}
				</ThemedText>
			)}
		</ThemedView>
	);
}
