import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Post, useAppContext } from "@/components/context";
import { Ionicons } from "@expo/vector-icons";

const feed = () => {
  const { posts, setPosts, monsters } = useAppContext();
  type Props = {
    item: Post;
  };

  type CommentProps = {
    item: {
      id: number;
      text: string;
      authorId: number;
    };
  };

  const Comment = ({ item }: CommentProps) => {
    const author = monsters.find((m) => m.id === item.authorId);
    return (
      <View style={styles.comments}>
        <Text>{item.text}</Text>
        <Text style={{ textAlign: "right", fontWeight: "bold", marginTop: 10 }}>
          - {author?.name}
        </Text>
      </View>
    );
  };

  const handleViewComments = (item: Post) => {
    const updatedArray = posts.map((p) =>
      p.id === item.id ? { ...p, viewComments: !p.viewComments } : p
    );

    setPosts([...updatedArray]);
  };

  const PostItem = ({ item }: Props) => {
    const author = monsters.find((m) => m.id === item.authorId);
    return (
      <>
        <View style={styles.post}>
          <Text
            style={[
              styles.whiteText,
              { fontWeight: "bold", fontSize: 20, marginBottom: 10 },
            ]}
          >
            {item.title}
          </Text>
          <Text style={styles.whiteText}>{item.text}</Text>
          <Text
            style={[
              styles.whiteText,
              { marginBottom: 10, marginTop: 10, textAlign: "right" },
            ]}
          >
            {author?.name}
          </Text>
          <Pressable
            style={styles.chatbubble}
            onPress={() => handleViewComments(item)}
          >
            <Ionicons
              name={"chatbubble-ellipses-outline"}
              color={"greenyellow"}
              size={20}
            />
            <Text style={styles.whiteText}>{item.comments.length}</Text>
          </Pressable>
          {item.viewComments && (
            <View>
              <FlatList
                data={item.comments}
                renderItem={({ item }) => <Comment item={item} />}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
          )}
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default feed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#475366",
    paddingTop: 10,
  },
  post: {
    backgroundColor: "#404040",
    marginBottom: 10,
    width: "90%",
    alignSelf: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  comments: {
    backgroundColor: "whitesmoke",
    margin: 5,
    width: "90%",
    alignSelf: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  whiteText: {
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    fontSize: 16,
  },
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
});
