import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Post, useAppContext } from "./context";

type Props = {
  item: Post;
};

const SymbolsWithCounters = ({ item }: Props) => {
  const { posts, setPosts } = useAppContext();

  const handleViewComments = (item: Post, posts: Post[], setPosts: any) => {
    const updatedArray = posts.map((p) =>
      p.id === item.id ? { ...p, viewComments: !p.viewComments } : p
    );

    setPosts([...updatedArray]);
  };

  const handleLikePost = (item: Post) => {
    const updatedPosts = posts.map((post) =>
      post.id === item.id
        ? { ...post, likes: post.likes + 1 } // Ökar likes med 1
        : post
    );
    setPosts(updatedPosts);
  };

  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <Pressable
        style={styles.chatbubble}
        onPress={() => handleViewComments(item, posts, setPosts)}
      >
        <Ionicons
          name={"chatbubble-ellipses-outline"}
          color={"greenyellow"}
          size={20}
        />
        <Text style={styles.whiteText}>{item.comments.length}</Text>
      </Pressable>

      <Pressable style={styles.chatbubble} onPress={() => handleLikePost(item)}>
        <Ionicons name={"heart-outline"} color={"maroon"} size={20} />
        <Text style={styles.whiteText}>{item.likes}</Text>
      </Pressable>
    </View>
  );
};

export default SymbolsWithCounters;

const styles = StyleSheet.create({
  chatbubble: {
    flexDirection: "row",
    gap: 5,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "grey",
    padding: 3,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  whiteText: {
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    fontSize: 16,
  },
});
