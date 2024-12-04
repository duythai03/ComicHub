import React, { useCallback, useRef } from "react";
import { View, ScrollView } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { useTheme } from "../../utils/Context";
import { ThemedText } from "@/components/themed/ThemedText";

export default function Comment({ comicId, visible, onClose }) {
  const bottomSheetRef = useRef(null);
  const { isDarkMode } = useTheme();
  const modalBackgroundColor = isDarkMode ? "#232531" : "#fff";

  const handleSheetChanges = useCallback(
    (index) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={visible ? 0 : -1}
      snapPoints={["70%", "90%"]}
      onChange={handleSheetChanges}
      enablePanDownToClose
      backgroundStyle={{ backgroundColor: modalBackgroundColor }}
    >
      <View className="w-full flex-row justify-center">
        <ThemedText>Bình luận</ThemedText>
      </View>
      <ScrollView className="px-3 mt-3">
        <ThemedText>Form bình luận</ThemedText>
      </ScrollView>
    </BottomSheet>
  );
}
