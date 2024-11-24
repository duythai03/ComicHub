import {
	useColorScheme as useColorSchemeDefault,
	Appearance,
} from "react-native";
import { useState, useEffect, useCallback, useLayoutEffect } from "react";
import AppAsyncStorage from "@/utils/AppAsyncStorage";

async function getStoredTheme() {
	try {
		const storedTheme = await AppAsyncStorage.getItem("theme");
		return storedTheme; // Trả về theme được lưu trữ (nếu có)
	} catch (error) {
		console.error("Error reading theme from AsyncStorage:", error);
		return null;
	}
}

export function useColorScheme(
	initialColorScheme: string | undefined = undefined,
) {
	const systemScheme = useColorSchemeDefault() || "dark";
	const [theme, setTheme]: [string, (theme: string) => void] = useState(
		initialColorScheme || systemScheme,
	);

	const [isSetThemeAttempted, setIsSetThemeAttempted] = useState(false);

	const changeTheme = useCallback(
		(theme: string) => {
			// no need to wait because it's not critical
			AppAsyncStorage.setItem("theme", theme);
			setIsSetThemeAttempted(true);
			setTheme(theme);
		},
		[theme],
	);

	useLayoutEffect(() => {
		const fetchTheme = async () => {
			const storedTheme = await getStoredTheme();
			if (storedTheme) changeTheme(storedTheme); // The user stored theme so no need to check the system changed anymore
		};
		fetchTheme();
	}, []);

	useEffect(() => {
		const subscription = Appearance.addChangeListener(({ colorScheme }) => {
			if (isSetThemeAttempted) return;
			setTheme(colorScheme || "dark");
		});

		return () => subscription.remove();
	}, []);

	return { theme, setTheme: changeTheme };
}
