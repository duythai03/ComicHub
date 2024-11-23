import { ThemedText } from "@/components/themed/ThemedText";
import { ThemedView } from "@/components/themed/ThemedView";
import logo from "R/logo.jpg";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { ThemedValidTextInput } from "@/components/themed";
import { isRequired, useValidation } from "@/hooks/validation";
import { allValid, validateAll } from "@/hooks/validation/useValidation";

function LoginScreen() {
	const navigation = useNavigation();
	const {
		value: username,
		onChangeText: onUsernameChange,
		errored: usernameErrored,
		errorMessage: usernameErrorMessage,
		validate: validateUsername,
	} = useValidation("", [isRequired]);

	const {
		value: password,
		onChangeText: onPasswordChange,
		errored: passwordErrored,
		errorMessage: passwordErrorMessage,
		validate: validatePassword,
	} = useValidation("", [isRequired]);

	const handleLogin = () => {
		// validate as least as one
		if (validateAll(validatePassword, validateUsername)) {
			navigation.navigate("HomeTab");
		}
	};

	const navigateToRegister = () => {
		navigation.navigate("RegisterScreen");
	};

	return (
		<ThemedView
			className="flex-1 justify-center items-center px-4"
			style={{
				backgroundColor: "transparent",
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
			<ThemedValidTextInput
				value={username}
				onChangeText={onUsernameChange}
				errored={usernameErrored}
				errorMessage={usernameErrorMessage}
				placeholder="Username"
				keyboardType="email-address"
				className="w-full p-4 rounded-xl mb-6"
				style={{ elevation: 5 }}
			/>

			<ThemedValidTextInput
				value={password}
				onChangeText={onPasswordChange}
				errored={passwordErrored}
				errorMessage={passwordErrorMessage}
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

			<ThemedView className="flex-row items-center justify-between">
				<ThemedText>Bạn chưa có tài khoản?</ThemedText>
				<TouchableOpacity onPress={navigateToRegister}>
					<ThemedText className="text-lg text-blue-500 ml-2">
						Đăng ký
					</ThemedText>
				</TouchableOpacity>
			</ThemedView>
		</ThemedView>
	);
}

export default LoginScreen;
