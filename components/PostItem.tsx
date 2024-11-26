import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Monster, Post, useAppContext } from "./context";
import { useState } from "react";

type Props = {
  item: Post;
};

type CommentProps = {
  item: {
    id: number;
    text: string;
    authorId: number;
  };
  monsters: Monster[];
};

const Comment = ({ item, monsters }: CommentProps) => {
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

const handleViewComments = (item: Post, posts: Post[], setPosts: any) => {
  const updatedArray = posts.map((p) =>
    p.id === item.id ? { ...p, viewComments: !p.viewComments } : p
  );

  setPosts([...updatedArray]);
};

const PostItem = ({ item }: Props) => {
  const [viewCommentInput, setViewCommentInput] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const { monsters, posts, setPosts, user } = useAppContext();
  const author = monsters.find((m) => m.id === item.authorId);

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

  const handleCommentPress = (item: Post) => {
    setViewCommentInput(!viewCommentInput);
  };
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

          {/* Ska hantera likes */}
          <Pressable
            style={styles.chatbubble}
            onPress={() => handleViewComments(item, posts, setPosts)}
          >
            <Ionicons name={"heart-outline"} color={"maroon"} size={20} />
            <Text style={styles.whiteText}>{item.comments.length}</Text>
          </Pressable>
        </View>
        {item.viewComments && (
          <View>
            <FlatList
              data={item.comments}
              renderItem={({ item }) => (
                <Comment item={item} monsters={monsters} />
              )}
              keyExtractor={(item) => item.id.toString()}
            />

            <Pressable
              style={styles.commentBtn}
              onPress={() => handleCommentPress(item)}
            >
              <Text style={{ fontWeight: "bold", color: "greenyellow" }}>
                Kommentera
              </Text>
            </Pressable>
            {viewCommentInput && (
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
            )}
          </View>
        )}
      </View>
    </>
  );
};

export default PostItem;

const styles = StyleSheet.create({
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
  commentBtn: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    padding: 5,
    width: 110,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
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
});
