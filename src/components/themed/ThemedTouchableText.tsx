import {
	TouchableOpacity,
	TouchableOpacityProps,
} from "react-native-gesture-handler";
import ThemedText, { ThemedTextProps } from "./ThemedText";

export type ThemedTouchableTextProps = ThemedTextProps & {
	touchableStyle?: TouchableOpacityProps["style"];
	touchableProps?: TouchableOpacityProps;
};

export default function ThemedTouchableText({
	touchableStyle,
	touchableProps,
	children,
	style,
	...props
}: ThemedTouchableTextProps) {
	return (
		<TouchableOpacity
			className="flex-row items-center"
			style={[touchableStyle]}
			{...touchableProps}
		>
			<ThemedText {...props} style={style}>
				{children}
			</ThemedText>
		</TouchableOpacity>
	);
}
