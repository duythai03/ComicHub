import { ThemedText } from "@/components/themed/ThemedText";
import { ThemedView } from "@/components/themed/ThemedView";
import logo from "R/logo.jpg";
import { Image, View } from "react-native";
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
import { register } from "@/apiServices/authService";
import { HttpStatusCode } from "axios";
import Toast from "react-native-toast-message";
import { useRef, useState } from "react";
import { ScreenName } from "@/constants/ScreenName";
import ThemedLoadingCircle from "@/components/themed/ThemedLoadingCircle";
import BackHomeLogo from "@/components/BackHomeLogo";
import ThemedMaterialsIcon from "@/components/themed/ThemedMaterialsIcon";

function RegisterScreen({ route }) {
	const { params } = route;
	const navigation = useNavigation();
	const passwordRef = useRef("");
	const [loading, setLoading] = useState(false);
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
		setErrorMessage: setUsernameErrorMessage,
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
		withMessage(
			MatchValue(() => passwordRef),
			"Passwords do not match",
		),
	]);

	const handleRegister = async () => {
		if (
			validateAll(
				validateUsername,
				validateName,
				validatePassword,
				validatePasswordConfirm,
			)
		) {
			setLoading(true);
			await register(
				{
					username,
					password,
					name,
				},
				(code) => {
					switch (code) {
						case HttpStatusCode.Conflict:
							setUsernameErrorMessage("The username is already taken");
							break;
						default:
							Toast.show({
								type: "error",
								text1: "Đã có lỗi xảy ra",
								text2: "Vui lòng thử lại sau",
							});
							break;
					}
				},
				() => {
					setLoading(false);
					navigation.navigate(ScreenName.LOGIN, {
						from: ScreenName.REGISTER,
						username,
					});
					Toast.show({
						type: "success",
						text1: "Đăng ký thành công",
						text2: "Vui lòng đăng nhập để tiếp tục",
					});
				},
			);
			setLoading(false);
		}
	};

	const navigateToLogin = () => {
		navigation.navigate("LoginScreen");
	};

	return (
		<ThemedView className="flex-1 justify-center items-center px-4 relative">
			<BackHomeLogo
				style={{
					borderWidth: 4,
					borderColor: "#fff",
				}}
				className="rounded-full mb-7 w-40 h-40 shadow-lg"
			/>
			{params?.from && (
				<View className="absolute top-4 left-0 p-4 opacity-80">
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<ThemedMaterialsIcon name="arrow-back" size={36} />
					</TouchableOpacity>
				</View>
			)}
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
				placeholder="Tên đăng nhập"
				keyboardType="email-address"
				className="w-full p-4 rounded-xl mb-4"
				style={{ elevation: 5 }}
				o
			/>

			<ThemedValidTextInput
				value={password}
				onChangeText={(text) => {
					passwordRef.current = text;
					onPasswordChange(text);
					validatePasswordConfirm(passwordConfirm);
				}}
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
				<ThemedLoadingCircle loading={loading} />
				{!loading && (
					<ThemedText className="text-lg font-semibold">Đăng ký</ThemedText>
				)}
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
