import { useAppContext } from "@/components/context";
import { useEffect, useState } from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";

const MyFeed = () => {
  const { posts, user, monsters } = useAppContext();

  const myPosts = posts.filter((post) => post.authorId === user.id);

  const postsWithUserComments = posts.filter((post) =>
    post.comments.some((comment) => comment.authorId === user.id)
  );

  const allMyPosts = [...myPosts, ...postsWithUserComments];

  const [postsState, setPostsState] = useState(allMyPosts);

  useEffect(() => {
    setPostsState(allMyPosts);
  }, [posts, user]);

  type Props = {
    item: {
      id: number;
      title: string;
      text: string;
      authorId: number;
      comments: {
        id: number;
        text: string;
        authorId: number;
      }[];
    };
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

  const PostItem = ({ item }: Props) => {
    const author = monsters.find((m) => m.id === item.authorId);
    return (
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
        <FlatList
          data={item.comments}
          renderItem={({ item }) => <Comment item={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={postsState}
        renderItem={({ item }) => <PostItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default MyFeed;

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
});
