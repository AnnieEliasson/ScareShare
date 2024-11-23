import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { Post, useAppContext } from "@/components/context";
import { useRouter } from "expo-router";

const addPost = () => {
  const router = useRouter();
  const { user, setPosts, posts } = useAppContext();
  const [newPost, setNewPost] = useState({
    title: "",
    text: "",
  });

  const handlePress = () => {
    const completeNewPost: Post = {
      id: Math.random(),
      title: newPost.title,
      text: newPost.text,
      authorId: user.id,
      comments: [],
      viewComments: false,
    };

    setPosts([completeNewPost, ...posts]);
    setNewPost({ title: "", text: "" });
    router.push({
      pathname: "/myFeed",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skapa nytt inlägg</Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Rubrik:</Text>
          <TextInput
            value={newPost.title}
            style={styles.titleInput}
            placeholder="Skriv rubriken här!"
            onChangeText={(e) => setNewPost({ ...newPost, title: e })}
          />
          <Text style={styles.label}>Text:</Text>
          <TextInput
            value={newPost.text}
            style={styles.textInput}
            placeholder="Skriv något..."
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
            onChangeText={(e) => setNewPost({ ...newPost, text: e })}
          />
          <Pressable style={styles.publishBtn} onPress={handlePress}>
            <Text style={styles.publishBtnText}>Publisera!</Text>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default addPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#475366",
  },
  title: {
    color: "white",
    fontSize: 30,
    textAlign: "center",
    marginTop: 20,
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  label: {
    color: "white",
    fontSize: 16,
    marginBottom: 10,
    marginTop: 20,
    alignSelf: "flex-start",
    marginLeft: 25,
  },
  titleInput: {
    padding: 5,
    fontSize: 16,
    backgroundColor: "white",
    width: 300,
    borderRadius: 3,
  },
  formContainer: {
    height: 310,
    margin: 10,
    alignItems: "center",
    borderWidth: 0,
    borderColor: "white",
    borderRadius: 10,
    backgroundColor: "#303030",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  textInput: {
    padding: 5,
    fontSize: 16,
    backgroundColor: "white",
    width: 300,
    height: 110,
    borderRadius: 3,
  },
  publishBtn: {
    backgroundColor: "greenyellow",
    borderRadius: 10,
    marginTop: 20,
  },
  publishBtnText: {
    padding: 10,
    fontWeight: "bold",
  },
});
