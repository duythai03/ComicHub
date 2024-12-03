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
        color="#c226f1"
        style={style}
        {...props}
      />
    </View>
  );
}
