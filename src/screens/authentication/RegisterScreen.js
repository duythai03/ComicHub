import { ThemedText } from "@/components/themed/ThemedText";
import { ThemedView } from "@/components/themed/ThemedView";
import logo from "R/logo.jpg";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { ThemedValidTextInput } from "@/components/themed";
import {
	MatchValue,
	MinLength,
	Required,
	useValidation,
} from "@/hooks/validation";
import { validateAll, withMessage } from "@/hooks/validation/useValidation";
import { Password } from "@/utils/validation";

function RegisterScreen() {
	const navigation = useNavigation();
	const {
		value: name,
		onChangeText: onNameChange,
		errorMessage: nameErrorMessage,
		validate: validateName,
	} = useValidation("", [Required, MinLength(2)]);
	const {
		value: username,
		onChangeText: onUsernameChange,
		errorMessage: usernameErrorMessage,
		validate: validateUsername,
	} = useValidation("", [Required, MinLength(2)]);

	const {
		value: password,
		onChangeText: onPasswordChange,
		errorMessage: passwordErrorMessage,
		validate: validatePassword,
	} = useValidation("", [Required, Password]);
	const {
		value: passwordConfirm,
		onChangeText: onpasswordConfirmChange,
		errorMessage: passwordConfirmErrorMessage,
		validate: validatePasswordConfirm,
	} = useValidation("", [
		Required,
		withMessage(MatchValue(password), "Passwords do not match"),
	]);

	const handleRegister = () => {
		if (
			validateAll(
				validateUsername,
				validateName,
				validatePassword,
				validatePasswordConfirm,
			)
		) {
			navigation.navigate("LoginScreen");
		}
	};

	const navigateToLogin = () => {
		navigation.navigate("LoginScreen");
	};

	return (
		<ThemedView className="flex-1 justify-center items-center px-4">
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
				value={name}
				onChangeText={onNameChange}
				errorMessage={nameErrorMessage}
				placeholder="Họ và Tên"
				className="w-full p-4 rounded-xl mb-4"
				style={{ elevation: 5 }}
			/>

			<ThemedValidTextInput
				value={username}
				onChangeText={onUsernameChange}
				errorMessage={usernameErrorMessage}
				placeholder="UserName"
				keyboardType="email-address"
				className="w-full p-4 rounded-xl mb-4"
				style={{ elevation: 5 }}
				o
			/>

			<ThemedValidTextInput
				value={password}
				onChangeText={onPasswordChange}
				errorMessage={passwordErrorMessage}
				placeholder="Mật khẩu"
				secureTextEntry
				className="w-full p-4 rounded-xl mb-4"
				style={{ elevation: 5 }}
			/>

			<ThemedValidTextInput
				value={passwordConfirm}
				onChangeText={onpasswordConfirmChange}
				errorMessage={passwordConfirmErrorMessage}
				placeholder="Xác nhận mật khẩu"
				secureTextEntry
				className="w-full p-4 rounded-xl mb-6"
				style={{ elevation: 5 }}
			/>

			<TouchableOpacity
				onPress={handleRegister}
				className="w-full p-4 rounded-xl items-center mb-6"
			>
				<ThemedText className="text-lg font-semibold">Đăng ký</ThemedText>
			</TouchableOpacity>

			<ThemedView className="flex-row items-center justify-center">
				<ThemedText>Bạn đã có tài khoản?</ThemedText>
				<TouchableOpacity onPress={navigateToLogin}>
					<ThemedText className="text-lg text-blue-500 ml-2">
						Đăng nhập
					</ThemedText>
				</TouchableOpacity>
			</ThemedView>
		</ThemedView>
	);
}

export default RegisterScreen;
