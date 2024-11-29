import { userAlreadyLoggedIn } from "@/apiServices/authService";
import { ThemedLoadingCircle } from "@/components/themed";
import { ThemedText } from "@/components/themed/ThemedText";
import { ThemedView } from "@/components/themed/ThemedView";
import { useUserContext } from "@/contexts/UserContext";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Image } from "react-native";

export default function ProfileScreen() {
	const { user, isLoading, loggedIn } = useUserContext();

	if (isLoading) {
		console.log("Loading...");
		return <ThemedLoadingCircle />;
	}

	return (
		<ThemedView className="flex-1 px-4">
			<ThemedView className="flex-row py-4 ml-2">
				<ThemedText className="flex-1 text-xl font-bold">Profile</ThemedText>
			</ThemedView>
			<Image
				source={{
					uri: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
				}}
				style={{
					width: 100,
					height: 100,
					borderRadius: 50,
				}}
				className="rounded-full mt-2 mb-4 border-4"
				resizeMode="cover"
			/>
		</ThemedView>
	);
}
