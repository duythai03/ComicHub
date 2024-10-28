import { View, ActivityIndicator } from "react-native";
import React from "react";

export default function LoadingCircle() {
  return (
    <View>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}
