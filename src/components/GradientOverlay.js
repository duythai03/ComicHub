import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet } from "react-native";

const GradientOverlay = ({ children, style, height = "60%" }) => {
  return (
    <LinearGradient
      colors={[
        "rgba(0, 0, 0, 0.9)",
        "rgba(0, 0, 0, 0.7)",
        "rgba(0, 0, 0, 0.3)",
        "rgba(0, 0, 0, 0)",
      ]}
      start={{ x: 0.5, y: 1 }}
      end={{ x: 0.5, y: 0 }}
      style={[styles.overlay, { height }, style]}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    justifyContent: "flex-end",
    display: "flex",
    gap: 4,
  },
});

export default GradientOverlay;
