// ./screens/Home.js

import React from "react";
import { View, Button, Text, StyleSheet, Alert } from "react-native";

const Contact = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.bottomTabButtons}>
        <Button title="Press me" onPress={() => navigation.navigate("Page1")} />
        <Button
          title="Press This"
          onPress={() => navigation.navigate("Page2")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    right: 10,
    left: 10,
    position: "absolute",
    bottom: 10,
  },
  bottomTabButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default Contact;
