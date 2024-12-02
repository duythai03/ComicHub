const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    // Primary and Secondary colors
    primary: "#c226f1", // Primary color (main brand color)
    primaryLight: "#93c5fd", // Lighter shade of primary color
    primaryDark: "#1e3a8a", // Darker shade of primary color
    secondary: "#03DAC6", // Secondary color (accent color)
    secondaryLight: "#6EFFD0", // Lighter shade of secondary color
    secondaryDark: "#018786", // Darker shade of secondary color

    // Background and Surface
    background: "#FFFFFF", // Main background color of the app
    surface: "#F4F4F4", // Background color for surfaces like cards, tables
    elevatedSurface: "#FFFFFF", // Surface color for elevated components (e.g., dialogs)

    modalBackground: "#F4F4F4",
    cancelText: "#555555",
    confirmText: "#ffffff",
    cancelButton: "#e0e0e0",
    confirmButton: "#5c9dff",

    // Text
    text: "#11181C", // Primary text color
    subtitle: "#687076",
    onPrimary: "#FFFFFF", // Text color on primary color elements
    onSecondary: "#000000", // Text color on secondary color elements
    onBackground: "#000000", // Text color on background color elements
    onSurface: "#000000", // Text color on surface color elements
    placeholder: "#9BA1A6", // Placeholder text color

    // Error and Alerts
    error: "#B00020", // Error color for alerts and messages
    onError: "#FFFFFF", // Text color on error color elements

    success: "#4CAF50", // Success message color
    onSuccess: "#000000", // Text color on success color elements

    warning: "#FF9800", // Warning message color
    onWarning: "#000000", // Text color on warning color elements

    info: "#2196F3", // Info message color
    onInfo: "#000000", // Text color on info color elements

    // Border and Dividers
    border: "#E5E7EB", // Border color for components like TextInput, Button

    // Other
    icon: "#687076", // Icon color
    notification: "#FF5252", // Error message color
    disabled: "#E0E0E0", // Disabled state color
  },

  dark: {
    // Primary and Secondary colors
    primary: "#c226f1", // Primary color (main brand color)
    primaryLight: "#93c5fd", // Lighter shade of primary color
    primaryDark: "#3700B3", // Darker shade of primary color
    secondary: "#03DAC6", // Secondary color (accent color)
    secondaryLight: "#6EFFD0", // Lighter shade of secondary color
    secondaryDark: "#018786", // Darker shade of secondary color

    // Background and Surface
    background: "#121212", // Main background color of the app (dark theme)
    surface: "#2A2D30", // Background color for surfaces like cards, tables
    elevatedSurface: "#121212", // Surface color for elevated components (e.g., dialogs)

    modalBackground: "#2A2D30",
    cancelButton: "#4a4a4f",
    confirmButton: "#4587e0",
    cancelText: "#bbbbbb",
    confirmText: "#ffffff",

    // Text
    text: "#ECEDEE", // Primary text color
    subtitle: "#9BA1A6",
    onPrimary: "#000000", // Text color on primary color elements
    onSecondary: "#000000", // Text color on secondary color elements
    onBackground: "#ECEDEE", // Text color on background color elements
    onSurface: "#ECEDEE", // Text color on surface color elements
    placeholder: "#2A2D30", // Placeholder text color

    // Error and Alerts
    error: "#CF6679", // Error color for alerts and messages
    onError: "#000000", // Text color on error color elements

    success: "#4CAF50", // Success message color
    onSuccess: "#000000", // Text color on success color elements

    warning: "#FF9800", // Warning message color
    onWarning: "#000000", // Text color on warning color elements

    info: "#2196F3", // Info message color
    onInfo: "#000000", // Text color on info color elements

    // Border and Dividers
    border: "#797f94",

    // Other
    icon: "#9BA1A6", // Icon color
    notification: "#FF5252", // Error message color
    disabled: "#6E6E6E", // Disabled state color
  },
};

type ColorsType = typeof Colors;

export type ThemeName = keyof ColorsType;
export type ThemeType = (typeof Colors)[ThemeName];
export type ThemeKey = keyof ColorsType[ThemeName] | undefined;
