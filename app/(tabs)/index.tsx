import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  AnnieUseYourTelescope_400Regular,
} from "@expo-google-fonts/annie-use-your-telescope";
import { useAppContext } from "@/components/context";

const index = () => {
  const { user } = useAppContext();
  let [fontsLoaded] = useFonts({
    AnnieUseYourTelescope_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.userText}>Inloggad som: {user?.name}</Text>
        <Text style={styles.text}>ScareShare</Text>
        <Text style={styles.slogan}>- För monster som vill mingla!</Text>
      </View>
      <StatusBar barStyle={"light-content"} />
    </>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#303030",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "greenyellow",
    fontSize: 80,
    fontFamily: "AnnieUseYourTelescope_400Regular",
    textAlign: "center",
    textShadowColor: "black",
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
  },
  slogan: {
    color: "orange",
    position: "absolute",
    top: 400,
    left: 137,
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  userText: {
    color: "white",
    position: "absolute",
    bottom: 100,
  },
});
