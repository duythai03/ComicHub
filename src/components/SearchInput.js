import { View, TextInput } from "react-native";
import { useState } from "react";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";

export default function SearchInput() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");

  const handleChangedText = (text) => {
    setSearchText(text);
  };

  const handleSearch = () => {
    navigation.navigate("Search", { searchText });
  };
  return (
    <View className="relative w-[80%] mb-4">
      <TextInput
        placeholder="Tìm kiếm truyện..."
        className="w-full rounded-3xl p-2 pl-10 bg-white"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          elevation: 2,
        }}
        onChangeText={handleChangedText}
        value={searchText}
        onSubmitEditing={handleSearch}
      />
      <Entypo
        name="magnifying-glass"
        size={24}
        style={{
          position: "absolute",
          left: 10,
          top: "25%",
          transform: [{ translateY: -2 }],
        }}
        onPress={handleSearch}
      />
    </View>
  );
}
