import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Platform,
  TextInput,
} from "react-native";
import * as colours from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SignIn = ({ navigation }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
  });

  const textInputChange = (val) => {
    if (val.length !== 0 && emailRegex.test(val.toLowerCase())) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.formWrapper}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Sign In</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.footer}>Email</Text>
              <View style={styles.action}>
                <FontAwesome name="user-o" size={20} />
                <TextInput
                  placeholder="Your Email"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(val) => textInputChange(val)}
                  textContentType="username"
                />
                {data.check_textInputChange ? (
                  <Feather name="check-circle" color="green" size={20} />
                ) : null}
              </View>
            </View>
            <View style={styles.inputWrapper}>
              <Text style={[styles.footer, { marginTop: 35 }]}>Password</Text>
              <View style={styles.action}>
                <FontAwesome name="lock" size={20} />
                <TextInput
                  placeholder="Your Password"
                  style={styles.textInput}
                  autoCapitalize="none"
                  secureTextEntry={data.secureTextEntry ? true : false}
                  onChangeText={(val) => handlePasswordChange(val)}
                  textContentType="password"
                />
                <TouchableOpacity onPress={updateSecureTextEntry}>
                  {data.secureTextEntry ? (
                    <Feather name="eye-off" color="grey" size={20} />
                  ) : (
                    <Feather name="eye" color="grey" size={20} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {}}
              style={[
                styles.siginIn,
                {
                  backgroundColor: "#000",
                },
              ]}
            >
              <Text style={{ color: colours.default.accent }}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUp")}
              style={[
                styles.siginIn,
                {
                  backgroundColor: "#fff",
                },
              ]}
            >
              <Text>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SignIn;

const { height } = Dimensions.get("screen");
const height_container = height * 0.4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch',
    justifyContent: "center",
  },
  formWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(255,255,255,0.8)",
    // height: height_container,
    width: height_container,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colours.default.accent,
    padding: 20,
  },
  title: {
    fontFamily: "YesevaOne",
    fontSize: 40,
    marginBottom: 20,
  },
  inputWrapper: {
    width: "100%",
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  siginIn: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: colours.default.accent,
    borderWidth: 1,
    marginTop: 15,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    color: "#000",
  },
});
