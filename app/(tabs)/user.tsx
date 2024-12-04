import {
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import AddUserBtn from "@/components/AddUserBtn";
import AddUserForm from "@/components/AddUserForm";
import { useRouter } from "expo-router";
import { useAppContext } from "@/components/context";

const user = () => {
  const { user, setUser, monsters, setMonsters } = useAppContext();
  const [showModal, setShowModal] = useState(false);

  type Monster = {
    id: number;
    name: string;
    color: string;
    eyes: number;
  };

  type Props = {
    monster: {
      id: number;
      name: string;
      color: string;
      eyes: number;
    };
  };

  const router = useRouter();

  const handleItemPress = (monster: Monster) => {
    setUser(monster);
    router.push({
      pathname: "/myFeed",
      params: { selectedMonsterId: monster.id },
    });
  };

  const Item = ({ monster }: Props) => {
    const isSelected = monster.id === user?.id;
    return (
      <View>
        <Pressable
          style={[
            styles.monsterContainer,
            {
              backgroundColor: isSelected ? "orange" : "white",
              borderWidth: 2,
            },
          ]}
          onPress={() => handleItemPress(monster)}
        >
          <Text style={{ fontWeight: isSelected ? "bold" : "normal" }}>
            Name: {monster.name}
          </Text>
          <Text>Color: {monster.color}</Text>
          <Text>Eyes: {monster.eyes}</Text>
        </Pressable>
      </View>
    );
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.topMenu}>
          <Pressable style={styles.topMenuBtn}>
            <Text>Logga in</Text>
          </Pressable>
          <Pressable style={styles.topMenuBtn}>
            <Text>Alla monster</Text>
          </Pressable>
        </View>
        <AddUserForm
          showModal={showModal}
          setShowModal={setShowModal}
          setMonsters={setMonsters}
          monsters={monsters}
        />
        <FlatList
          data={monsters}
          renderItem={({ item }) => <Item monster={item} />}
          keyExtractor={(item) => item.id.toString()}
          style={styles.flatList}
        />
        <AddUserBtn setShowModal={setShowModal} />
      </View>
    </>
  );
};

export default user;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#303030",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  text: {
    color: "white",
  },
  listContainer: {
    width: "100%",
  },
  monsterContainer: {
    width: "90%",
    padding: 10,
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 10,
    margin: "auto",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  flatList: {
    flex: 1,
    width: "100%",
    paddingTop: 20,
  },
  topMenu: {
    flexDirection: "row",
    gap: 50,
    height: 50,
  },
  topMenuBtn: {
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: 100,
    borderRadius: 10,
  },
});
