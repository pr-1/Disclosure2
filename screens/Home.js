// ./screens/Home.js

import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import * as api from "../utils/api";

const data = {
  email: "alan@nxav.co.uk",
  password: "admin",
};

const Home = () => {
  const loginButton = async () => {
    const user = await api.login(data);
    console.log(user);
  };
  return (
    <View style={styles.center}>
      <Text style={{ fontFamily: "Kollektif_Bold_Italic", fontSize: 30 }}>
        This is the home screen
      </Text>
      <View>
        <Button
          title="Press me"
          onPress={() => {
            loginButton();
          }}
        />
      </View>
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

export default Home;
