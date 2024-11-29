import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { TouchableOpacityProps } from "react-native-gesture-handler";

type ThemedToggleableProps = TouchableOpacityProps & {
	onToggle?: (isOn: boolean) => void;
	children?: React.ReactNode;
};

const ThemedToggleable = ({
	onToggle,
	children,
	...props
}: ThemedToggleableProps) => {
	const [isOn, setIsOn] = useState(false);

	const handleToggle = () => {
		const newState = !isOn;
		setIsOn(newState);
		if (onToggle) {
			onToggle(newState);
		}
	};

	return (
		<View {...props}>
			<TouchableOpacity onPress={handleToggle}>{children}</TouchableOpacity>
		</View>
	);
};

export default ThemedToggleable;
