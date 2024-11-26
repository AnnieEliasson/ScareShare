import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Monster, Post, useAppContext } from "./context";
import { useState } from "react";
import SymbolsWithCounters from "./SymbolsWithCounters";
import CommentForm from "./CommentForm";

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

const PostItem = ({ item }: Props) => {
  const [viewCommentInput, setViewCommentInput] = useState(false);

  const { monsters } = useAppContext();
  const author = monsters.find((m) => m.id === item.authorId);

  const handleCommentPress = () => {
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
        <SymbolsWithCounters item={item} />
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
              onPress={() => handleCommentPress()}
            >
              <Text style={{ fontWeight: "bold", color: "greenyellow" }}>
                Kommentera
              </Text>
            </Pressable>
            {viewCommentInput && <CommentForm item={item} />}
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
});
