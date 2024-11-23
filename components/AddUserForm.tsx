import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState } from "react";

type Monster = {
  id: number;
  name: string;
  color: string;
  eyes: string | number;
};

type Props = {
  showModal: boolean;
  setShowModal: any;
  setMonsters: any;
  monsters: Monster[];
};

const AddUserForm = ({
  showModal,
  setShowModal,
  setMonsters,
  monsters,
}: Props) => {
  const [newMonster, setNewMonster] = useState<Monster>({
    id: 0,
    name: "",
    color: "",
    eyes: "",
  });
  return (
    <Modal animationType="slide" transparent={true} visible={showModal}>
      <View style={styles.modalBackground}>
        <View style={styles.formContainer}>
          <View style={styles.inputBox}>
            <Text style={styles.label}>Namn:</Text>
            <TextInput
              value={newMonster.name}
              style={styles.textInput}
              onChangeText={(e) => setNewMonster({ ...newMonster, name: e })}
            />
            <Text style={styles.label}>Färg:</Text>
            <TextInput
              value={newMonster.color}
              style={styles.textInput}
              onChangeText={(e) => setNewMonster({ ...newMonster, color: e })}
            />
            <Text style={styles.label}>Antal ögon:</Text>
            <TextInput
              value={newMonster.eyes.toString()}
              style={styles.textInput}
              keyboardType="numeric"
              onChangeText={(e) =>
                setNewMonster({ ...newMonster, eyes: Number(e) })
              }
            />
          </View>
          <Pressable
            style={styles.addBtn}
            onPress={() => {
              setNewMonster({ ...newMonster, id: Math.random() });
              setMonsters([newMonster, ...monsters]);
              setShowModal(false);
            }}
          >
            <Text>Submit</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default AddUserForm;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(12, 12, 12, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "80%",
    backgroundColor: "grey",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
    alignItems: "center",
  },
  addBtn: {
    backgroundColor: "greenyellow",
    padding: 10,
    width: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  inputBox: {
    marginTop: 20,
    width: "100%",
    height: "auto",
    alignItems: "center",
    gap: 10,
    marginBottom: 30,
  },
  textInput: {
    width: "80%",
    fontSize: 20,
    backgroundColor: "white",
    padding: 5,
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: 30,
    marginBottom: -5,
    color: "greenyellow",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    fontWeight: "bold",
  },
});
