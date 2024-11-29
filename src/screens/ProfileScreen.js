import ThemeButton from "@/components/ThemeButton";
import ThemedMaterialsIcon from "@/components/themed/ThemedMaterialsIcon";
import { ThemedText } from "@/components/themed/ThemedText";
import ThemedTouchableText from "@/components/themed/ThemedTouchableText";
import { ThemedView } from "@/components/themed/ThemedView";
import { ScreenName } from "@/constants/ScreenName";
import { useUserContext } from "@/contexts/UserContext";
import { useThemeColor } from "@/theme/useThemeColor";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, Image } from "react-native";

export default function ProfileScreen() {
	const { user, logout } = useUserContext();
	const navigation = useNavigation();
	const errorColor = useThemeColor("error");

	if (!user) {
		return (
			<ThemedView className="flex-1 px-4 items-center justify-center">
				<ThemedMaterialsIcon name="login" size={80} color={errorColor} />
				<ThemedText className="text-center mt-10 mb-8">
					You are not logged in. Please log in to view your profile.
				</ThemedText>
				<ThemedTouchableText
					onPress={() =>
						navigation.navigate(ScreenName.LOGIN, { from: ScreenName.PROFILE })
					}
					className="text-2xl font-bold text-center mb-9"
				>
					Login
				</ThemedTouchableText>
			</ThemedView>
		);

	}

	return (
		<ThemedView className="flex-1 px-4">
			<ThemedView className="flex-row py-4 ml-2">
				<ThemedText className="flex-1 text-xl font-bold">Profile</ThemedText>
			</ThemedView>
			<ThemedView className="flex-row justify-between">
				<ThemedView className=" flex-col self-start items-center justify-center mb-9">
					<Image
						source={{
							uri: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
						}}
						className="rounded-full mt-2 mb-4 border-4 w-32 h-32"
						resizeMode="cover"
					/>

					<ThemedText className="text-center text-lg font-bold">
						{user?.name}
					</ThemedText>
				</ThemedView>
				<ThemedView className="ml-4 flex-col items-center flex-1">
					<ThemedView className="flex-col items-center space-x-2">
						<ThemedText className="text-xl font-bold">42</ThemedText>
						<ThemedText className="text-lg ">Comics</ThemedText>
					</ThemedView>

					<ThemedView className="flex-col items-center mt-4 space-x-2">
						<ThemedText className="text-xl font-bold">1,234</ThemedText>
						<ThemedText className="text-lg">Friends</ThemedText>
					</ThemedView>
				</ThemedView>
			</ThemedView>
			<ThemeButton title="Edit Profile" />
			<Button title="Logout" onPress={logout} />
		</ThemedView>
	);
}
