import { View, TextInput, Image, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import userImg from "../../../assets/userImg.jpg";
import { ThemedText } from "@/components/themed/ThemedText";
import { postComment } from "@/utils/CommentApi";
import { useMutation } from "@tanstack/react-query";
import { useUserContext } from "@/contexts/UserContext";

export default function PostComment({ comicId, chapterId, onPostSuccess }) {
  const [comment, setComment] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const { user } = useUserContext();

  const mutation = useMutation(postComment, {
    onSuccess: () => {
      setIsPosting(false);
      setComment("");
      if (onPostSuccess) {
        onPostSuccess();
      }
    },
    onError: (error) => {
      setIsPosting(false);
      console.error("Failed to post comment:", error.message);
    },
  });

  const handlePostComment = () => {
    if (comment.trim() === "") return;
    setIsPosting(true);
    mutation.mutate({ content: comment, comicId, chapterId });
  };

  return (
    <View className="flex-row mb-4 items-center">
      <Image source={userImg} className="w-14 h-14 rounded-full mr-2" />
      <View className="flex-1 ml-2">
        <ThemedText className="font-bold ml-2 mb-1">{user?.name}</ThemedText>
        <TextInput
          placeholder="Viết bình luận..."
          className="rounded-full px-3 py-1"
          style={{ backgroundColor: "#f0f0f0" }}
          value={comment}
          onChangeText={(text) => setComment(text)}
          onSubmitEditing={handlePostComment}
        />
      </View>
      {isPosting && <ActivityIndicator size="small" color="#0000ff" />}
    </View>
  );
}
