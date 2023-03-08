import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Alert,
  Text,
  Dimensions,
  TextInput,
  ImageBackground,
} from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import * as authActions from "../store/actions/auth";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AsyncAlert from "../components/UI/AsyncAlert";

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const { height } = Dimensions.get("window");

const Forgotten = ({ navigation }) => {
  const [error, setError] = useState();
  const [data, setData] = useState({
    email: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    async function customAlert() {
      if (error) {
        await AsyncAlert("Reset Password", error);
        AsyncStorage.removeItem("validateToken");
        AsyncStorage.removeItem("userToken");
        navigation.navigate("SignIn");
      }
    }

    customAlert();
  }, [error]);

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

  const submitHandler = async () => {
    if (data.password === data.confirmPassword) {
      let action;
      action = authActions.resetPassword(data.email);
      try {
        await dispatch(action).then(() => {
          setError(
            "Please check your junk mail if you dont receive your temporary password."
          );
        });
      } catch (err) {
        console.log({ err });
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.formWrapper}>
          <View style={styles.formContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Password Reset</Text>
              <View style={styles.instructionsContainer}>
                <Text style={styles.instructions}>
                  To reset your password, please input your account email below.
                </Text>
              </View>
              <View style={styles.instructionsContainer}>
                <Text style={styles.instructions2}>
                  If the email address is registered with us you will receive an
                  email with a temporary password.
                </Text>
              </View>
              <View style={styles.instructionsContainer}>
                <Text style={styles.instructions2}>
                  Not received the email? Please check your junk mail folder.
                </Text>
              </View>
            </View>

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

            <TouchableOpacity
              onPress={() => {
                submitHandler();
              }}
              style={[
                styles.signIn,
                {
                  backgroundColor: "#000",
                },
              ]}
            >
              <Text style={{ color: Colors.accent }}>Reset Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

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
    marginTop: 22,
    backgroundColor: "rgba(255,255,255,0.9)",
    width: height_container,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: Colors.accent,
    padding: 20,
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontFamily: "YesevaOne",
    fontSize: 30,
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
    justifyContent: "space-between",
    marginTop: 10,
    paddingVertical: 10,
    paddingLeft: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  signIn: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: Colors.accent,
    borderWidth: 1,
    marginTop: 15,
    psdding: 30,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    color: "#000",
  },
  instructionsContainer: {
    marginBottom: 10,
  },
});
export default Forgotten;
