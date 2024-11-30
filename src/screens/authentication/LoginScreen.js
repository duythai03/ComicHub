import { ThemedText } from "@/components/themed/ThemedText";
import { ThemedView } from "@/components/themed/ThemedView";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { ThemedValidTextInput } from "@/components/themed";
import { MinLength, Required, useValidation } from "@/hooks/validation";
import { validateAll } from "@/hooks/validation/useValidation";
import { login } from "@/apiServices/authService";
import { useUserContext } from "@/contexts/UserContext";
import { useState } from "react";
import ThemedLoadingCircle from "@/components/themed/ThemedLoadingCircle";
import { HttpStatusCode } from "axios";
import Toast from "react-native-toast-message";
import { ScreenName } from "@/constants/ScreenName";
import BackHomeLogo from "@/components/BackHomeLogo";
import { EventName } from "@/constants/EventName";
import ThemedMaterialsIcon from "@/components/themed/ThemedMaterialsIcon";
import { View } from "react-native";
import { emitEvent } from "@/utils/event";

function LoginScreen({ route }) {
	const { params } = route;
	const navigation = useNavigation();
	const [loading, setLoading] = useState(false);
	const {
		value: username,
		onChangeText: onUsernameChange,
		errorMessage: usernameErrorMessage,
		validate: validateUsername,
	} = useValidation(
		(params?.from === ScreenName.REGISTER && params?.username) || "",
		[Required, MinLength(2)],
	);

	const {
		value: password,
		onChangeText: onPasswordChange,
		errorMessage: passwordErrorMessage,
		setErrorMessage: setPasswordErrorMessage,
		validate: validatePassword,
	} = useValidation("", [Required]);

	const handleLogin = async () => {
		// validate as least as one
		if (validateAll(validatePassword, validateUsername)) {
			setLoading(true);

			const dataResponse = await login(
				{
					username,
					password,
				},
				(code) => {
					switch (code) {
						case HttpStatusCode.NotFound:
							Toast.show({
								type: "error",
								text1: "Tài khoản không tồn tại",
								text2: "Vui lòng kiểm tra lại tên đăng nhập hoặc mật khẩu",
							});
							break;
						default:
							Toast.show({
								type: "error",
								text1: "Đã có lỗi xảy ra",
							});
					}
				},
			);
			setLoading(false);
			if (dataResponse) {
				emitEvent(EventName.LOGIN, dataResponse);
				navigation.navigate("HomeTab");
			}
		}
	};

	const navigateToRegister = () => {
		navigation.navigate(ScreenName.REGISTER, { from: ScreenName.LOGIN });
	};

	const handleForgotPassword = () => {
		console.log("Forgot password");
	};

	return (
		<ThemedView
			className="flex-1 justify-center items-center px-4 relative"
			style={{
				backgroundColor: "transparent",
			}}
		>
			{params?.from && (
				<View className="absolute top-4 left-0 p-4 opacity-80">
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<ThemedMaterialsIcon name="arrow-back" size={36} />
					</TouchableOpacity>
				</View>
			)}
			<BackHomeLogo
				style={{ borderWidth: 4, borderColor: "white" }}
				className="rounded-full mb-12 w-40 h-40 shadow-lg"
			/>
			<ThemedValidTextInput
				value={username}
				onChangeText={onUsernameChange}
				errorMessage={usernameErrorMessage}
				placeholder="Username"
				keyboardType="email-address"
				className="w-full p-4 rounded-xl mb-6"
				style={{ elevation: 5 }}
			/>

			<ThemedValidTextInput
				value={password}
				onChangeText={onPasswordChange}
				errorMessage={passwordErrorMessage}
				placeholder="Mật khẩu"
				secureTextEntry
				className="w-full p-4 rounded-xl "
				style={{ elevation: 5 }}
			/>

			<ThemedView style={{ alignSelf: "flex-end" }}>
				<TouchableOpacity onPress={handleForgotPassword}>
					<ThemedText primary className="text-right">
						Quên mật khẩu?
					</ThemedText>
				</TouchableOpacity>
			</ThemedView>

			<TouchableOpacity
				onPress={handleLogin}
				className="w-full p-4 rounded-xl items-center mb-6"
			>
				<ThemedLoadingCircle loading={loading} />
				{!loading && (
					<ThemedText className="text-lg font-semibold">Đăng nhập</ThemedText>
				)}
			</TouchableOpacity>

			<ThemedView className="flex-row items-center justify-between">
				<ThemedText>Bạn chưa có tài khoản?</ThemedText>
				<TouchableOpacity onPress={navigateToRegister}>
					<ThemedText primary className="text-lg ml-2">
						Đăng ký
					</ThemedText>
				</TouchableOpacity>
			</ThemedView>
		</ThemedView>
	);
}

export default LoginScreen;
