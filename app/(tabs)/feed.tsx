import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import React from "react";
import { useAppContext } from "@/components/context";

import PostItem from "@/components/PostItem";

const feed = () => {
  const { posts } = useAppContext();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </KeyboardAvoidingView>
  );
};

export default feed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#475366",
    paddingTop: 10,
  },
  list: {
    paddingBottom: 80,
  },
});
