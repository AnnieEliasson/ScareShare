import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Post, useAppContext } from "./context";

type Props = {
  item: Post;
};

const CommentForm = ({ item }: Props) => {
  const { posts, setPosts, user } = useAppContext();
  const [commentInput, setCommentInput] = useState("");
  const handleSendCommentPress = (item: Post) => {
    const newComment = {
      id: Math.random(),
      text: commentInput,
      authorId: user.id,
    };

    const updatedPosts = posts.map((post) =>
      post.id === item.id
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    );

    setPosts(updatedPosts);
    setCommentInput("");
  };
  return (
    <>
      <TextInput
        placeholder="Skriv något..."
        multiline={true}
        numberOfLines={4}
        textAlignVertical="top"
        style={styles.input}
        value={commentInput}
        onChangeText={(e) => setCommentInput(e)}
      />
      <Pressable onPress={() => handleSendCommentPress(item)}>
        <Text style={styles.sendBtnText}>Skicka</Text>
      </Pressable>
    </>
  );
};

export default CommentForm;

const styles = StyleSheet.create({
  sendBtnText: {
    color: "white",
    fontWeight: "bold",
    alignSelf: "flex-end",
    marginRight: 20,
    borderWidth: 1,
    borderColor: "white",
    padding: 3,
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  input: {
    backgroundColor: "white",
    fontSize: 16,
    padding: 5,
    width: 280,
    height: 80,
    alignSelf: "center",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
});
