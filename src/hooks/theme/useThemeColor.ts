/**
 * Custom hook to retrieve the appropriate theme color based on the current color scheme (light or dark).
 * It allows you to use predefined colors from the `Colors` constant or override them with custom values.
 *
 * @param colorName - The name of the color key that exists in both `Colors.light` and `Colors.dark`.
 * @param props - (Optional) An object containing custom colors for light and dark modes.
 *   - `light`: The custom color to use in light mode.
 *   - `dark`: The custom color to use in dark mode.
 *
 * @returns The color value based on the current color scheme (`light` or `dark`). If custom colors are
 * provided via the `props` parameter, those will take precedence over the default colors.
 *
 * ## Usage Example
 * ```tsx
 * import { useThemeColor } from "@/hooks/useThemeColor";
 *
 * function MyComponent() {
 *   const backgroundColor = useThemeColor("background");
 *   const textColor = useThemeColor("text", { light: "#000000", dark: "#ffffff" });
 *
 *   return (
 *     <View style={{ backgroundColor }}>
 *       <Text style={{ color: textColor }}>Hello, World!</Text>
 *     </View>
 *   );
 * }
 * ```
 *
 * ## Notes
 * - Ensure that `colorName` exists in both `Colors.light` and `Colors.dark` to avoid runtime errors.
 * - If `useColorScheme()` returns `null`, the default scheme is considered `light`.
 *
 */
import { ThemeKey, ThemeName, ThemeType } from "@/constants/Colors";
import { useThemeContext } from "./ThemeContext";

export function useThemeColor<
	T extends ThemeKey | undefined = undefined, // Default to undefined if not specified
>(
	colorKey?: T,
	props?: Partial<Record<ThemeName, string>>,
): T extends undefined ? ThemeType : string {
	const { theme, colors }: { theme: ThemeName; colors: ThemeType } =
		useThemeContext();

	if (!colorKey)
		return colors as any; // `colors` is ThemeType
	else if (!props) return colors[colorKey] as any; // `colors[colorKey]` is string
	return (props[theme] as any) ?? colors[colorKey]; // Custom or default color
}
