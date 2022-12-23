import React, { useEffect, useRef, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Platform,
  TextInput,
  Alert,
} from "react-native";
import * as colours from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import { AuthContext } from "../components/context";
import Users from "../model/users";
import * as api from "../utils/api";
import * as auth from "../store/actions/auth";

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SignInScreen = ({ navigation }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const { signIn } = useContext(AuthContext);
  const dispatch = useDispatch();

  const textInputChange = (val) => {
    if (val.trim().length >= 4 && emailRegex.test(val.toLowerCase())) {
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
    if (val.trim().length >= 4) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4 && emailRegex.test(val.toLowerCase())) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandler = async (email, password) => {
    let foundUser;

    // const foundUser = Users.filter((item) => {
    //   return email == item.email && password == item.password;
    // });

    if (data.email.length == 0 || data.password.length == 0) {
      Alert.alert("Invalid Input!", "Email or Password field cannot be empty", [
        { text: "Okay" },
      ]);
      return;
    } else {
      try {
        foundUser = await dispatch(auth.login(email, password));
      } catch (err) {
        console.log({ err });
      }
    }

    if (foundUser.length == 0) {
      Alert.alert("Invalid User!", "Email or Password is incorrect", [
        { text: "Okay" },
      ]);
      return;
    }
    signIn(foundUser);
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
                  onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                  textContentType="username"
                />
                {data.check_textInputChange ? (
                  <Feather name="check-circle" color="green" size={20} />
                ) : null}
              </View>

              {data.isValidUser ? null : (
                <Text style={styles.errorMsg}>Invalid email format.</Text>
              )}
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
                    <Feather name="eye-off" color="grey" size={25} />
                  ) : (
                    <Feather name="eye" color="grey" size={25} />
                  )}
                </TouchableOpacity>
              </View>

              <TouchableOpacity>
                <Text
                  style={{
                    color: colours.default.accent,
                    marginTop: 20,
                    fontSize: 12,
                  }}
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                loginHandler(data.email, data.password);
              }}
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

export default SignInScreen;

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
  errorMsg: {
    color: "red",
    fontSize: 12,

    marginTop: 10,
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
