import { ThemedMaterialsIcon } from "@/components/themed";
import ThemedText from "@/components/themed/ThemedText";
import ThemedView from "@/components/themed/ThemedView";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

function TermsScreen() {
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
			<ThemedView className="flex-1 px-6">
				<ScrollView>
					<ThemedText className="text-2xl font-bold">
						Terms and Conditions
					</ThemedText>

					<ThemedText className="mt-6">
						Welcome to our app! By accessing or using this app, you agree to
						comply with the following terms and conditions:
					</ThemedText>

					<ThemedText className="mt-4 text-lg font-bold">
						1. User Accounts:
					</ThemedText>
					<ThemedText className="mt-2">
						You must create an account to use some of the features of the app.
						You are responsible for maintaining the confidentiality of your
						account information.
					</ThemedText>

					<ThemedText className="text-lg mt-4 font-bold">
						2. Acceptable Use:
					</ThemedText>
					<ThemedText className="mt-2">
						You agree to use this app only for lawful purposes and in a way that
						does not violate the rights of others or restrict their use of the
						app.
					</ThemedText>

					<ThemedText className="text-lg mt-4 font-bold">
						3. Termination:
					</ThemedText>
					<ThemedText className="mt-2">
						We reserve the right to terminate your access to the app if we
						determine that you have violated any of these terms.
					</ThemedText>

					<ThemedText className="text-lg mt-4 font-bold">
						4. Limitation of Liability:
					</ThemedText>
					<ThemedText className="mt-2">
						We are not liable for any loss or damage arising from the use of
						this app, whether direct or indirect.
					</ThemedText>

					<ThemedText className="text-lg mt-4 font-bold">
						5. Changes to the Terms:
					</ThemedText>
					<ThemedText className="mt-2">
						We may update these terms from time to time. Any changes will be
						posted in this section, and your continued use of the app will
						constitute acceptance of the updated terms.
					</ThemedText>
				</ScrollView>
			</ThemedView>
		</>
	);
}
export default TermsScreen;
