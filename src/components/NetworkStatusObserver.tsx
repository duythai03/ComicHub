import React, { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";
import { emitEvent } from "@/utils/event";
import { EventName } from "@/constants/EventName";

const NetworkStatusObserver = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	useEffect(() => {
		const unsubcribe = NetInfo.addEventListener((state) => {
			if (state.isInternetReachable) {
				Toast.show({
					type: "success",
					text1: "Connected",
					text2: "You are connected to the internet",
					position: "bottom",
					bottomOffset: 80,
				});
				emitEvent(EventName.NO_INTERNET, {});
			} else {
				Toast.show({
					type: "error",
					text1: "Disconnected",
					text2: "You are not connected to the internet",
					position: "bottom",
					bottomOffset: 80,
				});
				emitEvent(EventName.INTERNET_BACK, {});
			}
		});

		return () => {
			unsubcribe();
		};
	}, []);

	return children;
};

export default NetworkStatusObserver;
