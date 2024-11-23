import { ThemedText } from "@/components/themed/ThemedText";
import ThemedTextInput from "@/components/themed/ThemedTextInput";
import { ThemedView } from "@/components/themed/ThemedView";
import logo from "R/logo.jpg";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

function LoginScreen() {
	const handleLogin = () => {};

	return (
		<ThemedView
			className="flex-1 justify-center items-center px-4"
			style={{
				backgroundColor: "transparent",
				background: "linear-gradient(to bottom, #4C6EF5, #5F92F1)",
			}}
		>
			<Image
				source={logo}
				style={{
					width: 160,
					height: 160,
					borderRadius: 80,
					marginBottom: 30,
					borderWidth: 4,
					borderColor: "#fff",
				}}
			/>
			<ThemedTextInput
				placeholder="Email"
				keyboardType="email-address"
				className="w-full p-4 rounded-xl mb-6"
				style={{ elevation: 5 }}
			/>

			<ThemedTextInput
				placeholder="Mật khẩu"
				secureTextEntry
				className="w-full p-4 rounded-xl mb-4"
				style={{ elevation: 5 }}
			/>

			<ThemedView style={{ alignSelf: "flex-end" }}>
				<TouchableOpacity>
					<ThemedText className="text-right text-blue-500">
						Quên mật khẩu?
					</ThemedText>
				</TouchableOpacity>
			</ThemedView>

			<TouchableOpacity
				onPress={handleLogin}
				className="w-full p-4 rounded-xl  items-center mb-6"
			>
				<ThemedText className="text-lg font-semibold">Đăng nhập</ThemedText>
			</TouchableOpacity>

			<ThemedView className="flex-row items-center justify-center">
				<ThemedText>Bạn chưa có tài khoản?</ThemedText>
				<TouchableOpacity>
					<ThemedText className="text-lg text-blue-500 ml-2">
						Đăng ký
					</ThemedText>
				</TouchableOpacity>
			</ThemedView>
		</ThemedView>
	);
}

export default LoginScreen;
