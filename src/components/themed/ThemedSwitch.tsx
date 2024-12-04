import React from "react";
import { Switch, StyleSheet, SwitchProps } from "react-native";
import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";

export type ThemedSwitchProps = SwitchProps & {
	title?: string;
};

const ThemedSwitch = ({ title, value, onValueChange }: ThemedSwitchProps) => (
	<ThemedView style={styles.switchContainer}>
		{title && <ThemedText style={styles.switchText}>{title}</ThemedText>}
		<Switch value={value} onValueChange={onValueChange} />
	</ThemedView>
);

const styles = StyleSheet.create({
	switchContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 10,
	},
	switchText: { fontSize: 18 },
});

export default ThemedSwitch;
