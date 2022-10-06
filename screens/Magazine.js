import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Magazine = () => {
  return (
    <View style={styles.center}>
      <Text>This is the All Magazine screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default Magazine;
