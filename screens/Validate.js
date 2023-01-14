import React, { useReducer, useCallback, useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Button,
  ActivityIndicator,
  Alert,
  Text,
  StatusBar,
  Image,
  Dimensions,
  TextInput,
  ImageBackground,
} from "react-native";
import { useDispatch } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Validate = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState({
    code: "",
    isValidCode: true,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured", error, [{ text: "Ok" }]);
    }
  }, [error]);

  const textChangeHandler = (val) => {
    if (val.trim().length == 6) {
      setData({
        code: val,
        isValidCode: true,
      });
    } else {
      setData({
        code: "",
        isValidCode: false,
      });
    }
  };

  const submitHandler = async () => {
    if (data.isValidCode) {
      setError(null);
      setIsLoading(true);
      console.log({ data });
      let action;

      action = authActions.verifyCode(data.code);

      try {
        await dispatch(action).then((response) => {
          if (response === true) {
            AsyncStorage.removeItem("validateToken");
            navigation.navigate("SignIn");
          }
        });
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.header}>
          <Image
            source={require("../assets/black.png")}
            style={styles.logo}
            resizeMode="stretch"
          />
        </View>
        <KeyboardAwareScrollView
          behaviour="padding"
          scrollEnabled={true}
          enableAutoAutomaticScroll={Platform.OS === "ios"}
          keyboardVerticalOffset={1001234}
          // enableOnAndroid={true}
          contentContainerStyle={{ flexGrow: 1 }}
          style={styles.screen}
          keyboardShouldPersistTaps="always"
        >
          <View style={styles.footer}>
            <View style={styles.footerTextContainers}>
              <Text style={styles.title}>Welcome to the Disclosure App.</Text>
              <View style={styles.instructionsContainer}>
                <Text style={styles.instructions}>
                  Please input the code emailed to you.
                </Text>
              </View>
              <View style={styles.instructionsContainer}>
                <Text style={styles.instructions2}>
                  If you have not received your email, please check your junk
                  folder.
                </Text>
              </View>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.inputWrapper}>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Sign up validation code"
                    style={styles.textInput}
                    onChangeText={(val) => {
                      textChangeHandler(val);
                    }}
                    keyboardType="number-pad"
                    autoFocus
                    maxLength={6}
                    textAlign="center"
                    textContentType="oneTimeCode"
                  />
                </View>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <TouchableOpacity style={styles.button} onPress={submitHandler}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              )}
            </View>
            <View>
              <Text style={styles.bottomText}>
                Or click on the link in the email.
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </View>
  );
};

const { height, width } = Dimensions.get("screen");
const height_logo = width > 600 ? height * 0.28 : height * 0.2;
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
  logo: {
    width: height_logo,
    height: height_logo,
  },
  header: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  footer: {
    flex: 3,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: width > 600 ? 50 : 20,
    paddingHorizontal: 30,
    height: "100%",
    alignItems: "center",
    marginTop: 20,
    alignItems: "center",
  },
  footerTextContainers: {
    width: width > 600 ? "70%" : "100%",
    alignItems: "center",
  },
  title: {
    color: "#000",
    fontSize: 30,
    fontFamily: "Kollektif_Bold",
  },
  instructionsContainer: {
    marginTop: 10,
  },
  instructions: {
    color: "#000",
    fontSize: 18,
    // fontFamily: "Kollektif_Bold",
  },
  instructions2: {
    color: "#555",
    fontSize: 16,
    // fontFamily: "Kollektif",
  },
  buttonContainer: {
    marginBottom: 10,
    width: "30%",
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 30,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: width > 600 ? 20 : 14,
  },
  inputWrapper: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    backgroundColor: "rgba(255,255,255,0.8)",
    width: height_container,
    borderRadius: width > 600 ? 15 : 10,
    borderWidth: 1,
    borderColor: Colors.accent,
    padding: width > 600 ? 20 : 10,
    // marginBottom: 10,
  },
  textInput: {
    flex: 1,
    marginTop: 0,
    paddingLeft: 10,
    color: Colors.blue,
    fontSize: width > 600 ? 25 : 18,
  },
  labelText: {
    color: "#000",
  },
});
export default Validate;
