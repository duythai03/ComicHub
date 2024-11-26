import { useNavigation } from "@react-navigation/native";

// export const navigationRef = createNavigationContainerRef();
const history = {
	navigation: null,
};

export function GlobalNavigation({ children }) {
	history.navigation = useNavigation();
	return children;
}

export function navigate(name, params) {
	if (history.navigation) {
		history.navigation.navigate(name, params);
	}
	// if (navigationRef.isReady()) {
	// 	navigationRef.navigate(name, params);
	// }
}
