import { ThemedText } from "@/components/themed/ThemedText";
import ThemedTextInput from "@/components/themed/ThemedTextInput";
import { ThemedView } from "@/components/themed/ThemedView";
import logo from "R/logo.jpg";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { ThemedValidTextInput } from "@/components/themed";
import { isRequired, useValidation } from "@/hooks/validation";
import { validateAll } from "@/hooks/validation/useValidation";

function RegisterScreen() {
	const navigation = useNavigation();
	const {
		value: name,
		onChangeText: onNameChange,
		errored: nameErrored,
		errorMessage: nameErrorMessage,
		validate: validateName,
	} = useValidation("", [isRequired]);
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
	const {
		value: passwordConfirm,
		onChangeText: onpasswordConfirmChange,
		errored: passwordConfirmErrored,
		errorMessage: passwordConfirmErrorMessage,
		validate: validatePasswordConfirm,
	} = useValidation("", [isRequired]);

	const handleRegister = () => {
		if (
			validateAll(
				validateUsername,
				validateName,
				validatePassword,
				validatePasswordConfirm,
			)
		) {
			navigation.navigate("HomeTab"); // Navigate to the Home screen after registration
		}
	};

	const navigateToLogin = () => {
		navigation.navigate("LoginScreen");
	};

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

			<ThemedValidTextInput
				value={name}
				onChangeText={onNameChange}
				errored={nameErrored}
				errorMessage={nameErrorMessage}
				placeholder="Họ và Tên"
				className="w-full p-4 rounded-xl mb-4"
				style={{ elevation: 5 }}
			/>

			<ThemedValidTextInput
				value={username}
				onChangeText={onUsernameChange}
				errored={usernameErrored}
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
				errored={passwordErrored}
				errorMessage={passwordErrorMessage}
				placeholder="Mật khẩu"
				secureTextEntry
				className="w-full p-4 rounded-xl mb-4"
				style={{ elevation: 5 }}
			/>

			<ThemedValidTextInput
				value={passwordConfirm}
				onChangeText={onpasswordConfirmChange}
				errored={passwordConfirmErrored}
				errorMessage={passwordConfirmErrorMessage}
				placeholder="Xác nhận mật khẩu"
				secureTextEntry
				className="w-full p-4 rounded-xl mb-6"
				style={{ elevation: 5 }}
			/>

			<TouchableOpacity
				onPress={handleRegister}
				className="w-full p-4 rounded-xl bg-blue-500 items-center mb-6"
			>
				<ThemedText className="text-lg font-semibold text-white">
					Đăng ký
				</ThemedText>
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
