// ./screens/About.js

import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import * as colours from "../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StartupScreen = ({ navigation }) => {
  const logoAnimationValue = useRef(new Animated.Value(0)).current;
  logoAnimationValue.setValue(0);

  useEffect(() => {
    Animated.timing(logoAnimationValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    async function getValidateToken() {
      let validate = null;
      try {
        validate = await AsyncStorage.getItem("validateToken");
      } catch (e) {
        console.log({ e });
      }
      if (validate) {
        navigation.navigate("Validate");
      }
    }
    getValidateToken();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.header}>
          <Animated.View
            style={{
              opacity: logoAnimationValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            }}
          >
            <Image
              source={require("../assets/black.png")}
              style={styles.logo}
              resizeMode="stretch"
            />
          </Animated.View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.title}>Receive the best discounts today</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
            style={styles.button}
          >
            <Text style={{ color: colours.default.accent }}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default StartupScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch',
    justifyContent: "center",
  },
  loginForm: {
    flex: 2,
    backgroundColor: "#fff",
    opacity: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.6)",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
    height: "100%",
  },
  title: {
    color: "#000",
    fontSize: 30,
    fontFamily: "Kollektif_Bold",
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 30,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
});
