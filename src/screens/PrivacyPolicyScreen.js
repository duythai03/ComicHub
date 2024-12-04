import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ThemedView from "@/components/themed/ThemedView";
import ThemedText from "@/components/themed/ThemedText";
import { ThemedMaterialsIcon } from "@/components/themed";

function PrivacyPolicyScreen() {
	const navigation = useNavigation();
	return (
		<>
			<ThemedView
				className="flex-row items-center px-6 py-3"
				lightColor="#f9f9f9"
				darkColor="#121212"
			>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<ThemedMaterialsIcon name="arrow-back" size={36} />
				</TouchableOpacity>
			</ThemedView>
			<ThemedView className="flex-1 px-4">
				<ScrollView>
					<ThemedText className="text-2xl font-bold">Privacy Policy</ThemedText>
					<ThemedText className="mt-4">
						We value your privacy. This Privacy Policy explains how we collect,
						use, and protect your personal information when you use our app.
					</ThemedText>

					<ThemedText className="text-lg font-bold mt-4">
						1. Information We Collect:
					</ThemedText>
					<ThemedText className="mt-2">
						We collect personal information such as your name, email address,
						and usage data when you register and use our app.
					</ThemedText>

					<ThemedText className="text-lg font-bold mt-4">
						2. How We Use Your Information:
					</ThemedText>
					<ThemedText className="mt-2">
						The information we collect is used to personalize your experience,
						improve our app, and send you relevant notifications or updates.
					</ThemedText>

					<ThemedText className="text-lg font-bold mt-4">
						3. Data Security:
					</ThemedText>
					<ThemedText className="mt-2">
						We take reasonable steps to protect your personal information from
						unauthorized access, alteration, or destruction.
					</ThemedText>

					<ThemedText className="text-lg font-bold mt-4">
						4. Sharing Your Information:
					</ThemedText>
					<ThemedText className="mt-2">
						We do not sell, trade, or rent your personal information to third
						parties. However, we may share your information with trusted service
						providers who assist us in running the app.
					</ThemedText>

					<ThemedText className="text-lg font-bold mt-4">
						5. Your Rights:
					</ThemedText>
					<ThemedText className="mt-2">
						You have the right to access, update, or delete your personal
						information. You can also request to opt-out of marketing
						communications.
					</ThemedText>

					<ThemedText className="text-lg font-bold mt-4">
						6. Changes to This Policy:
					</ThemedText>
					<ThemedText className="mt-2">
						We may update this Privacy Policy from time to time. Any changes
						will be posted here, and the effective date will be updated
						accordingly.
					</ThemedText>
				</ScrollView>
			</ThemedView>
		</>
	);
}
export default PrivacyPolicyScreen;
