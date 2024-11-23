import { AppProperty } from "@/constants/AppProperties";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppAsyncStorage = {
	setItem: async (key, value) => {
		await AsyncStorage.setItem(
			`${AppProperty.APP_NAME}_${key}`,
			JSON.stringify(value),
		);
	},
	getItem: async (key) => {
		const result = await AsyncStorage.getItem(`${AppProperty.APP_NAME}_${key}`);
		return JSON.parse(result);
	},

	removeItem: async (key) => {
		await AsyncStorage.removeItem(`${AppProperty.APP_NAME}_${key}`);
	},
};

export default AppAsyncStorage;
