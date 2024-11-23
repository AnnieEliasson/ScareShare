import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  setShowModal: (arg0: boolean) => void;
};

const AddUserBtn = ({ setShowModal }: Props) => {
  return (
    <Pressable onPress={() => setShowModal(true)} style={styles.addUserBtn}>
      <Text style={styles.btnText}>+</Text>
    </Pressable>
  );
};

export default AddUserBtn;

const styles = StyleSheet.create({
  addUserBtn: {
    backgroundColor: "greenyellow",
    width: 80,
    height: 80,
    borderRadius: "50%",
    position: "absolute",
    bottom: 20,
    right: 20,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 30,
  },
});
