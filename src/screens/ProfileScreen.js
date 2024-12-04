import { ThemedLoadingCircle, ThemedProgressBar } from "@/components/themed";
import ThemedMaterialsIcon from "@/components/themed/ThemedMaterialsIcon";
import { ThemedText } from "@/components/themed/ThemedText";
import ThemedTouchableText from "@/components/themed/ThemedTouchableText";
import ThemedView from "@/components/themed/ThemedView";
import { ScreenName } from "@/constants/ScreenName";
import { useUserContext } from "@/contexts/UserContext";
import { useThemeContext } from "@/theme/ThemeContext";
import { useThemeColor } from "@/theme/useThemeColor";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
	Button,
	Image,
	ScrollView,
	TouchableOpacity,
	View,
} from "react-native";

export default function ProfileScreen() {
	const { user, logout, logoutLoading } = useUserContext();
	const navigation = useNavigation();
	const errorColor = useThemeColor("error");

	const { setTheme, allColors, colors, theme } = useThemeContext();

	if (!user) {
		return (
			<ThemedView className="flex-1 px-4 items-center justify-center">
				<ThemedMaterialsIcon name="login" size={70} color={errorColor} />
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
		<ThemedView className="flex-1 p-4 pb-6">
			<ScrollView>
				<ThemedText className="pb-6 text-xl font-bold">Profile</ThemedText>

				<ThemedView className="w-full flex-col items-center justify-center mb-9">
					<Image
						source={{
							uri: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
						}}
						className="rounded-full mt-2 mb-4 border-4 border-white shadow-md w-32 h-32"
						resizeMode="cover"
					/>
					<View className="flex-row items-center">
						<ThemedText className="text-center text-lg font-bold">
							{user?.name}
						</ThemedText>
						<TouchableOpacity className="ml-2">
							<ThemedMaterialsIcon name="edit" size={24} />
						</TouchableOpacity>
					</View>

					<View className="flex items-center flex-row w-full mt-4">
						<ThemedText className="text-lg font-bold">4</ThemedText>
						<ThemedMaterialsIcon
							lightColor="#FFD700"
							darkColor="#FFD700"
							name="emoji-events"
							size={32}
							className="font-bold text-center mr-2 ml-1"
						/>

						<ThemedProgressBar filledValue={10} />
					</View>
				</ThemedView>

				{/* Chế độ nền */}
				<ThemedText className="text-xl font-bold mb-2">Chế độ nền</ThemedText>
				<ThemedView className="flex-row justify-between">
					{Object.keys(allColors).map((name) => {
						const isActive = name === theme;
						return (
							<TouchableOpacity
								key={name}
								onPress={() => setTheme(name)}
								className="h-20 rounded-lg mb-4 justify-center items-center"
								style={{
									width: "48%",
									borderWidth: 4,
									borderColor: colors.border,
									backgroundColor: allColors[name].background,
								}}
							>
								<ThemedText
									className="text-lg font-bold"
									style={{
										color: allColors[name].text,
									}}
								>
									{name}
								</ThemedText>
								{isActive && (
									<ThemedMaterialsIcon
										name="check-circle"
										size={20}
										color={allColors[name].success}
										style={{ position: "absolute", top: 5, right: 5 }}
									/>
								)}
							</TouchableOpacity>
						);
					})}
				</ThemedView>

				{/* Banner */}
				<ThemedView className="mt-4 py-4">
					<ThemedText className="text-xl font-bold mb-2">Premium</ThemedText>
					<Image
						source={require("R/image/premium-banner.jpg")}
						className="mt-2 mb-4 rounded-lg border-4 border-white shadow-md w-full h-48"
						resizeMode="cover"
					/>
				</ThemedView>

				{/* Links */}
				<ThemedView className="my-4">
					<ThemedText className="text-xl font-bold mb-2">Giới thiệu</ThemedText>
					<ThemedTouchableText
						iconPrefixColor="#FFD700"
						iconPrefixName="star"
						onPress={() => navigation.navigate(ScreenName.TERMS_OF_SERVICE)}
						className="py-3 px-4 mb-2 text-lg hover:bg-gray-200"
					>
						Điều khoản sử dụng
					</ThemedTouchableText>
					<ThemedTouchableText
						onPress={() => navigation.navigate(ScreenName.PRIVACY_POLICY)}
						iconPrefixName="shield"
						iconPrefixColor="#FFD700"
						className="py-3 px-4 mb-2 text-lg hover:bg-gray-200"
					>
						Chính sách bảo mật
					</ThemedTouchableText>
					<ThemedTouchableText
						onPress={() => navigation.navigate(ScreenName.ABOUT_US)}
						iconPrefixName="info"
						iconPrefixColor="#FFD700"
						className="py-3 px-4 mb-2 text-lg hover:bg-gray-200"
					>
						Giới thiệu chúng tôi
					</ThemedTouchableText>
				</ThemedView>

				{(logoutLoading && (
					<ThemedLoadingCircle size="small" loading={logoutLoading} />
				)) || <Button title="Logout" onPress={logout} />}
			</ScrollView>
		</ThemedView>
	);
}
