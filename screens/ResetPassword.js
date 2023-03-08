import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  Platform,
  TextInput,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Colors from "../constants/Colors";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as auth from "../store/actions/auth";
import AsyncAlert from "../components/UI/AsyncAlert";
import { AuthContext } from "../components/context";

const SignUp = ({ navigation }) => {
  const user = useSelector((state) => state.auth);
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
    passwordStrength: 0,
    passwordMessage: "",

    check_textInputChange: false,

    check_passwordInputChange: false,
    secureTextEntry: true,
    confirmSecureTextEntry: true,

    isValidPassword: true,
    isValidPasswordMatch: true,

    color: "grey",
  });
  const { signIn } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [form, setForm] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function customAlert() {
      if (error) {
        await AsyncAlert("An error occured", error);
      }
    }
    customAlert();
  }, [error]);

  const handleValidPassword = (val) => {
    if (val.trim().length >= 1) {
      setData({
        ...data,
        isValidPassword: false,
      });
    } else {
      setData({
        ...data,
        isValidPassword: true,
      });
    }
  };

  const handleValidPasswordMatch = (val) => {
    if (val.trim().length >= 1 && data.password === data.confirmPassword) {
      setData({
        ...data,
        isValidPasswordMatch: true,
        color: "green",
        passwordMessage: "",
      });
    } else {
      setData({
        ...data,
        isValidPasswordMatch: false,
        color: "red",
      });
    }
  };

  const handlePasswordChange = (val) => {
    let message = "Password should be at least 8 characters";

    let strength = 0;
    let color = "red";

    if (val.match(/[a-z]+/)) {
      strength += 1;
    }
    if (val.match(/[A-Z]+/)) {
      strength += 1;
    }
    if (val.match(/[0-9]+/)) {
      strength += 1;
    }
    if (val.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      strength += 1;
    }
    if (val.trim().length > 7) {
      if (strength === 4) {
        message = "Password strength is very strong";
        color = "green";
      }
      if (strength === 3) {
        message = "Password strength is strong";
        color = "green";
      }
      if (strength === 2) {
        message = "Password strength is medium";
        color = "black";
      }
      if (strength === 1) {
        message = "Password strength is weak";
        color = "red";
      }
    }

    setData({
      ...data,
      password: val,
      passwordStrength: color,
      passwordMessage: message,
    });
  };
  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirmPassword: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirmSecureTextEntry: !data.confirmSecureTextEntry,
    });
  };

  useEffect(() => {
    if (data.password === data.confirmPassword) {
      setData({
        ...data,
        check_passwordInputChange: true,
      });
    } else {
      setData({
        ...data,
        check_passwordInputChange: false,
      });
    }
  }, [data.password, data.confirmPassword]);

  useEffect(() => {
    if (data.check_passwordInputChange) {
      setForm(true);
    } else {
      setForm(false);
    }
  }, [data]);

  const resetPasswordHandler = async () => {
    if (data.password === data.confirmPassword) {
      setData({
        ...data,
        passwordMessage: "Passwords must match",
      });
    }

    if (form && data.passwordStrength != "red" && user?.token) {
      try {
        const response = await dispatch(
          auth.changePassword(data.password, user.token)
        );

        if (response) {
          signIn(response);
          Alert.alert("Password updated successfully", "", [
            {
              text: "Ok",
              onPress: () => {
                navigation.navigate("Profile");
              },
            },
          ]);
        }
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError("Incorrect Information!", "Please correct the errors");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background.png")}
        style={styles.backgroundImage}
      >
        <KeyboardAwareScrollView
          behaviour="padding"
          scrollEnabled={true}
          enableAutoAutomaticScroll={Platform.OS === "ios"}
          keyboardVerticalOffset={150}
          enableOnAndroid={true}
          contentContainerStyle={{ flexGrow: 1 }}
          style={styles.screen}
          keyboardShouldPersistTaps="always"
        >
          <View style={styles.formWrapper}>
            <View style={styles.formContainer}>
              <Text style={styles.title}>Reset Password</Text>

              <View style={styles.inputWrapper}>
                <Text style={[styles.footer, { marginTop: 25 }]}>Password</Text>

                <View style={styles.action}>
                  <FontAwesome name="lock" size={20} />
                  <TextInput
                    placeholder="Your Password"
                    style={styles.textInput}
                    autoCapitalize="none"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    onChangeText={(val) => handlePasswordChange(val)}
                    onEndEditing={(e) =>
                      handleValidPassword(e.nativeEvent.text)
                    }
                  />
                  <TouchableOpacity onPress={updateSecureTextEntry}>
                    {data.secureTextEntry ? (
                      <Feather name="eye-off" color={data.color} size={25} />
                    ) : (
                      <Feather name="eye" color={data.color} size={25} />
                    )}
                  </TouchableOpacity>
                </View>
                {data.isValidPassword ? null : (
                  <Text
                    style={[styles.errorMsg, { color: data.passwordStrength }]}
                  >
                    {data.passwordMessage}.
                  </Text>
                )}
              </View>

              <View style={styles.inputWrapper}>
                <Text style={[styles.footer, { marginTop: 25 }]}>
                  Confirm Password
                </Text>
                <View style={styles.action}>
                  <FontAwesome name="lock" size={20} />
                  <TextInput
                    placeholder="Confirm Your Password"
                    style={styles.textInput}
                    autoCapitalize="none"
                    secureTextEntry={data.confirmSecureTextEntry ? true : false}
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                    onEndEditing={(e) =>
                      handleValidPasswordMatch(e.nativeEvent.text)
                    }
                  />
                  <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
                    {data.confirmSecureTextEntry ? (
                      <Feather name="eye-off" color={data.color} size={25} />
                    ) : (
                      <Feather name="eye" color={data.color} size={25} />
                    )}
                  </TouchableOpacity>
                </View>
                {data.isValidPasswordMatch ? null : (
                  <Text style={styles.errorMsg}>{data.passwordMessage}</Text>
                )}
              </View>

              <TouchableOpacity
                onPress={resetPasswordHandler}
                style={[
                  styles.siginUp,
                  {
                    backgroundColor: "#000",
                  },
                ]}
              >
                <Text style={{ color: Colors.default.accent }}>
                  Reset Password
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </View>
  );
};

export default SignUp;

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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(255,255,255,0.9)",
    // height: height_container,
    width: "85%", //Platform.OS === "ios" ? "80%" : height_container,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: Colors.default.accent,
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
    marginTop: 0,
    paddingLeft: 10,
    color: Colors.blue,
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  dobAction: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  siginUp: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: Colors.accent,
    borderWidth: 1,
    marginTop: 15,
  },
  signIn: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  errorMsg: {
    color: "red",
    fontSize: 12,
    marginTop: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    color: "#000",
  },
  text: {
    flex: 1,
    marginTop: 0,
    paddingLeft: 10,
    color: "#aaa",
  },

  // Style for iOS ONLY...
  datePicker: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: 320,
    height: 260,
    display: "flex",
  },
  radioButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    alignItems: "center",
    backgroundColor: Colors.black,
    paddingVertical: 10,
    paddingHorizontal: 50,
    width: "80%",
  },
  button2: {
    alignItems: "center",
    backgroundColor: Colors.black,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
    borderColor: Colors.accent,
    borderWidth: 1,
  },
  buttonLabel: {
    color: "#05375a",
    // fontFamily: "open-sans-bold",
    fontSize: 15,
  },
  label: {
    // fontFamily: "open-sans-bold",
    marginVertical: 8,
    color: "#05375a",
  },
  genderButtons: {
    flexDirection: "row",
    alignItems: "center",
    width: "30%",
  },
  genderButtonLabel: {
    flexDirection: "row",
  },
  genderButtonLabelText: {
    color: "#05375a",
  },
  mailingList: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 30,
  },
  signUp: {
    color: "white",
    fontFamily: "open-sans-bold",
    fontSize: 15,
    width: "70%",
  },
  textCheckbox: {
    color: "#05375a",
  },
  unchecked: {
    // height: 32,
    // width: 32,
    // borderColor: Colors.blue,
    // borderWidth: 1,
    // borderRadius: 15,
    // overflow: "hidden",
  },
  checked: {
    flexDirection: "row",
    lineHeight: 25,
    justifyContent: "space-between",
    width: "95%",
  },
});
