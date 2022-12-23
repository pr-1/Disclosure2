// ./screens/Home.js

import React, { useEffect } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";

import * as productsActions from "../store/actions/products";
import * as auth from "../store/actions/auth";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log({ e });
      }
      console.log(JSON.parse(userToken));
      dispatch(auth.reRegister(JSON.parse(userToken)));
      dispatch(productsActions.fetchCategories());
    }, 1);
  }, []);

  return (
    <View style={styles.center}>
      <Text style={{ fontFamily: "Kollektif_Bold_Italic", fontSize: 30 }}>
        This is the home screen
      </Text>
      <View>
        <Button title="Press me" onPress={() => {}} />
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
