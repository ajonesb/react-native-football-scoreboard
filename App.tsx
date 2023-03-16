import React from "react";
import { StyleSheet, View, ImageBackground, ScrollView } from "react-native";
import Scoreboard from "./src/components/Scoreboard/Scoreboard";
import backgroundImage from "./assets/worldcup.jpg";

export default function App() {
  return (
    
      <View style={styles.container}>
        <ScrollView style={{ width: "100%" }}>
          <ImageBackground
            source={backgroundImage}
            resizeMode="cover"
            style={styles.image}
          >
            <View style={styles.overlay}></View>
            <Scoreboard />
          </ImageBackground>
        </ScrollView>
      </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
    opacity: 0.7,
  },
});
