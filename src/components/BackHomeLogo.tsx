import {
  Image,
  ImageProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import logo from "R/logo.jpg";

export type BackHomeLogoProps = ImageProps & {
  onPress?: () => void;
  navigated: boolean;
  touchOpacityProps?: TouchableOpacityProps;
};

export default function BackHomeLogo({
  navigated = true,
  touchOpacityProps,
  onPress,
  ...props
}: BackHomeLogoProps) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      {...touchOpacityProps}
      onPress={() => {
        if (navigated) {
          navigation.navigate("HomeTab", { screen: "Home" });
        }

        onPress && onPress();
      }}
    >
      <Image {...props} source={logo} />
    </TouchableOpacity>
  );
}
