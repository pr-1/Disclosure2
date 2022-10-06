// ./screens/Home.js

import React from "react";
import { View, Button, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Page1 = ({ navigation, route }) => {
  return (
    <View style={styles.center}>
      <Text>This is Page 1 and the category = {route.params.cat}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    position: "absolute",
    alignItems: "center",
    bottom: 0,
  },
  bottomTabButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    backgroundColor: "#000",
    height: 80,
    paddingTop: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  iconBehave: {
    padding: 14,
  },
});
export default Page1;
