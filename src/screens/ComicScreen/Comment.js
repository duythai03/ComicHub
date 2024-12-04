import React, { useCallback, useRef, useState } from "react";
import { View, ScrollView, Image } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { useTheme } from "../../utils/Context";
import { ThemedText } from "@/components/themed/ThemedText";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCommentList } from "@/utils/CommentApi";
import PostComment from "./PostComment";
import userImg from "../../../assets/userImg.jpg";

export default function Comment({ comicId, chapterId, visible, onClose }) {
  const bottomSheetRef = useRef(null);
  const { isDarkMode } = useTheme();
  const modalBackgroundColor = isDarkMode ? "#232531" : "#fff";
  const [commentList, setCommentList] = useState([]);
  const queryClient = useQueryClient(); // Sử dụng queryClient

  const handleSheetChanges = useCallback(
    (index) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose]
  );

  // Query để lấy danh sách bình luận
  const { isLoading } = useQuery({
    queryKey: ["comment", comicId],
    queryFn: () => getCommentList(comicId),
    onSuccess: (data) => {
      const allComments = data.flatMap((item) => item.comments);
      setCommentList(allComments);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // Cập nhật lại danh sách bình luận sau khi post comment
  const handlePostSuccess = () => {
    // Làm mới query comment khi post thành công
    queryClient.invalidateQueries(["comment", comicId]);
  };

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
      <ScrollView className="px-3 mt-3 h-full flex-1">
        <PostComment
          comicId={comicId}
          chapterId={chapterId}
          onPostSuccess={handlePostSuccess} // Truyền callback vào PostComment
        />
        {!isLoading &&
          commentList.map((comment) => (
            <View key={comment.id} className="flex-row mb-4 items-center">
              <Image source={userImg} className="w-10 h-10 rounded-full mr-2" />
              <View className="flex-1 ml-2">
                <ThemedText className="font-bold">
                  {comment.author.name || "Username"}
                </ThemedText>
                <ThemedText>{comment.content}</ThemedText>
              </View>
            </View>
          ))}
      </ScrollView>
    </BottomSheet>
  );
}
