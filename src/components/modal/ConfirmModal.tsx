import { useThemeColor } from "@/theme/useThemeColor";
import React from "react";
import { Modal, View, StyleSheet, ModalProps } from "react-native";
import { ThemedText } from "../themed/ThemedText";
import ThemedTouchableText from "../themed/ThemedTouchableText";
import LoadingCircle from "../LoadingCircle";

export type ConfirmModalProps = ModalProps & {
	visible: boolean;
	message: string;
	onClose: () => void;
	onConfirm: () => void;
	confirmLoading?: boolean;
	title?: string;
	confirmText?: string;
	cancelText?: string;
};

export default function ConfirmModal({
	visible,
	onClose,
	onConfirm,
	confirmLoading,
	title,
	message,
	confirmText = "Confirm",
	cancelText = "Cancel",
}: ConfirmModalProps) {
	const modalBackgroundColor = useThemeColor("modalBackground");
	const confirmTextColor = useThemeColor("confirmText");
	const cancelTextColor = useThemeColor("cancelText");
	const confirmButtonBackgroundColor = useThemeColor("confirmButton");
	const cancelButtonBackgroundColor = useThemeColor("cancelButton");

	return (
		<Modal
			visible={visible}
			transparent={true}
			animationType="fade"
			onRequestClose={onClose}
		>
			<View
				className="flex-1 justify-center items-center"
				style={{
					backgroundColor: "rgba(0, 0, 0, 0.5)",
				}}
			>
				<View
					className="rounded-lg p-4 w-5/6"
					style={[
						{
							backgroundColor: modalBackgroundColor,
						},
					]}
				>
					{title && (
						<ThemedText
							className="font-bold mb-4 text-center"
							style={[
								{
									fontSize: 18,
								},
							]}
						>
							{title}
						</ThemedText>
					)}
					<ThemedText
						className="text-center mb-8"
						style={[
							{
								marginTop: title ? 0 : 8,
								fontSize: 16,
							},
						]}
					>
						{message}
					</ThemedText>
					<View className="flex-row justify-between w-full">
						<ThemedTouchableText
							touchableStyle={[
								{
									borderRadius: 10,
									backgroundColor: cancelButtonBackgroundColor,
								},
							]}
							onPress={onClose}
							className="p-3"
							style={[
								{
									color: cancelTextColor,
								},
							]}
						>
							{cancelText}
						</ThemedTouchableText>
						{(confirmLoading && (
							<View className="w-full justify-center">
								<LoadingCircle
									color={confirmTextColor}
									size={30}
									loading={confirmLoading}
								/>
							</View>
						)) || (
							<ThemedTouchableText
								className="p-3"
								touchableStyle={[
									{
										borderRadius: 10,
										backgroundColor: confirmButtonBackgroundColor,
									},
								]}
								onPress={onConfirm}
								style={[{ color: confirmTextColor }]}
							>
								{confirmText}
							</ThemedTouchableText>
						)}
					</View>
				</View>
			</View>
		</Modal>
	);
}
