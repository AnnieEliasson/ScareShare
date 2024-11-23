import { useAppContext } from "@/components/context";
import PostItem from "@/components/PostItem";
import { useEffect, useState } from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";

const MyFeed = () => {
  const { posts, user } = useAppContext();

  const myPosts = posts.filter((post) => post.authorId === user.id);

  const postsWithUserComments = posts.filter((post) =>
    post.comments.some((comment) => comment.authorId === user.id)
  );

  const allMyPosts = [...myPosts, ...postsWithUserComments];

  const [postsState, setPostsState] = useState(allMyPosts);

  useEffect(() => {
    setPostsState(allMyPosts);
  }, [posts, user]);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={postsState}
          renderItem={({ item }) => <PostItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </>
  );
};

export default MyFeed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#475366",
    paddingTop: 10,
  },
});
