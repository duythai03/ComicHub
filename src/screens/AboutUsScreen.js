import React from "react";
import {
	ThemedView,
	ThemedText,
	ThemedMaterialsIcon,
} from "@/components/themed";
import { ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function AboutUsScreen() {
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
					<ThemedText className="text-2xl font-bold">1. About Us</ThemedText>

					<ThemedText className="mt-4">
						We are a team dedicated to providing an engaging and seamless
						experience for our users. Our mission is to help you discover,
						create, and enjoy the best comics.
					</ThemedText>

					<ThemedText className="text-lg mt-4 font-bold">
						2. Our Story:
					</ThemedText>
					<ThemedText className="mt-2">
						Our journey began with a passion for comics and a desire to create
						an app that would bring fans and creators together. Our goal is to
						offer a platform where people can explore a variety of comic genres,
						share their creations, and connect with like-minded individuals.
					</ThemedText>

					<ThemedText className="text-lg mt-4 font-bold">
						3. Our Values:
					</ThemedText>
					<ThemedText className="mt-2">
						We believe in creativity, community, and inclusivity. We strive to
						foster a positive and respectful environment for all users of our
						platform.
					</ThemedText>

					<ThemedText className="text-lg mt-4 font-bold">
						4. Contact Us:
					</ThemedText>
					<ThemedText className="mt-2">
						Have questions or feedback? We’d love to hear from you! You can
						reach us at comicapplication2003@gmail.com.
					</ThemedText>

					<ThemedText className="text-lg mt-4 font-bold">
						Thank you for being a part of our community, and we hope you enjoy
						using our app!
					</ThemedText>
					<ThemedText className="mt-4"></ThemedText>
				</ScrollView>
			</ThemedView>
		</>
	);
}
