import { View, ActivityIndicator, ActivityIndicatorProps } from "react-native";
import React from "react";

export type LoadingCircleProps = ActivityIndicatorProps & {
	loading: boolean;
};

export default function LoadingCircle({
	loading,
	style,
	...props
}: LoadingCircleProps) {
	return (
		<View>
			<ActivityIndicator
				size="large"
				color="#0000ff"
				style={style}
				{...props}
			/>
		</View>
	);
}
