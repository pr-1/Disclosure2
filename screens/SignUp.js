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
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import * as colours from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as api from "../utils/api";

let nameArr = [];
let fname;
let lname;

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const postcodeRegex =
  /^(([A-Z][A-HJ-Y]?\d[A-Z\d]?|ASCN|STHL|TDCU|BBND|[BFS]IQQ|PCRN|TKCA) ?\d[A-Z]{2}|BFPO ?\d{1,4}|(KY\d|MSR|VG|AI)[ -]?\d{4}|[A-Z]{2} ?\d{2}|GE ?CX|GIR ?0A{2}|SAN ?TA1)$/;

const phoneRegex = /^[\+\(\s.\-\/\d\)]{5,30}$/;

const validate = async (postcode) => {
  let headers = {
    Accept: "*/*",
    "Accept-Encoding": "gzip,deflate,br",
    Connection: "keep-alive",
  };
  try {
    const response = await fetch(
      `https://api.postcodes.io/postcodes/${postcode}`,
      {
        method: "GET",
        headers,
      }
    );

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log({ error });
    return null;
  }
};

const SignUp = ({ navigation }) => {
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    postcode: "",
    password: "",
    confirmPassword: "",
    passwordStrength: 0,
    passwordMessage: "Password stength is weak",
    check_nameInputChange: false,
    check_textInputChange: false,
    check_phoneInputChange: false,
    check_postcodeInputChange: false,
    check_passwordInputChange: false,
    secureTextEntry: true,
    confirmSecureTextEntry: true,
    isValidName: true,
    isValidEmail: true,
    isValidPhone: true,
    isValidPostcode: true,
    isValidPassword: true,
    isValidPasswordMatch: true,
  });

  const [form, setForm] = useState(false);

  const textInputChange = (val, type) => {
    switch (type) {
      case "email":
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
        break;

      case "name":
        const nameArr = val
          .toLowerCase()
          .replace(/[^a-z0-9 -]/gi, "")
          .split(" ");
        if (val.length <= data.fname.length + data.lname.length) {
          if (nameArr.length === 1) {
            fname = nameArr[0];
            lname = "";

            setData({
              ...data,
              fname: fname,
              lname: lname,
              check_nameInputChange: false,
            });
          }
        }

        if (nameArr.length > 1 && nameArr[1].length > 0) {
          for (let i = 0; i < nameArr.length; i++) {
            if (nameArr[i][0]) {
              nameArr[i] = nameArr[i][0].toUpperCase() + nameArr[i].substr(1);
            }
          }

          fname = nameArr[0];
          nameArr.shift();

          lname = nameArr.join(" ");

          setData({
            ...data,
            fname: fname,
            lname: lname,
            check_nameInputChange: true,
          });
        } else {
          fname = "";
          lname = "";
          setData({
            ...data,
            fname: "",
            lname: "",
            check_nameInputChange: false,
          });
        }

        break;

      case "phone":
        val = val.replace(" ", "");

        if (val.length > 10) {
          setData({
            ...data,
            phone: val,
            check_phoneInputChange: true,
          });
        } else {
          setData({
            ...data,
            phone: "",
            check_phoneInputChange: false,
          });
        }
        break;

      case "postcode":
        if (val.length !== 0 && postcodeRegex.test(val.toUpperCase())) {
          if (val.length > 6) {
            if (validate(val)) {
              setData({
                ...data,
                postcode: val,
                check_postcodeInputChange: true,
              });
            } else {
              setData({
                ...data,
                postcode: "",
                check_postcodeInputChange: false,
              });
            }
          } else {
            setData({
              ...data,
              postcode: "",
              check_postcodeInputChange: false,
            });
          }
        }

        break;
    }
  };

  const handleValidName = (val) => {
    if (val.trim().length >= 4 && data.fname && data.lname) {
      setData({
        ...data,
        isValidName: true,
      });
    } else {
      setData({
        ...data,
        isValidName: false,
      });
    }
  };

  const handleValidEmail = (val) => {
    if (val.trim().length >= 4 && emailRegex.test(val.toLowerCase())) {
      setData({
        ...data,
        isValidEmail: true,
      });
    } else {
      setData({
        ...data,
        isValidEmail: false,
      });
    }
  };

  const handleValidPhone = (val) => {
    if (val.trim().length >= 10 && phoneRegex.test(val)) {
      setData({
        ...data,
        isValidPhone: true,
      });
    } else {
      setData({
        ...data,
        isValidPhone: false,
      });
    }
  };

  const handleValidPostcode = (val) => {
    if (val.trim().length >= 6 && postcodeRegex.test(val.toUpperCase())) {
      setData({
        ...data,
        isValidPostcode: true,
      });
    } else {
      setData({
        ...data,
        isValidPostcode: false,
      });
    }
  };

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
      });
    } else {
      setData({
        ...data,
        isValidPasswordMatch: false,
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
  console.log(
    { data },
    data.confirmPassword === "" || data.check_passwordInputChange
  );

  useEffect(() => {
    if (
      data.check_nameInputChange &&
      data.check_textInputChange &&
      data.check_phoneInputChange &&
      data.check_postcodeInputChange &&
      data.check_passwordInputChange
    ) {
      setForm(true);
    } else {
      setForm(false);
    }
  }, [data]);

  const signUpHandler = () => {
    if (form && data.passwordStrength != "red") {
      console.log({ data }, { form });
    } else {
      Alert.alert("Incorrect Information!", "Please correct the errors", [
        { text: "Okay" },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background.png")}
        style={styles.backgroundImage}
      >
        <KeyboardAwareScrollView>
          <View style={styles.formWrapper}>
            <View style={styles.formContainer}>
              <Text style={styles.title}>Sign Up</Text>

              <View style={styles.inputWrapper}>
                <Text style={styles.footer}>Full Name</Text>
                <View style={styles.action}>
                  <FontAwesome name="user-o" size={20} />
                  <TextInput
                    placeholder="Your full name"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val, "name")}
                    onEndEditing={(e) => handleValidName(e.nativeEvent.text)}
                  />
                  {data.check_nameInputChange ? (
                    <Feather name="check-circle" color="green" size={20} />
                  ) : null}
                </View>

                {data.isValidName ? null : (
                  <Text style={styles.errorMsg}>
                    Please input your full name.
                  </Text>
                )}
              </View>

              <View style={styles.inputWrapper}>
                <Text style={[styles.footer, { marginTop: 25 }]}>Email</Text>
                <View style={styles.action}>
                  <FontAwesome name="envelope-o" size={20} />
                  <TextInput
                    placeholder="Your Email"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val, "email")}
                    onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)}
                  />
                  {data.check_textInputChange ? (
                    <Feather name="check-circle" color="green" size={20} />
                  ) : null}
                </View>

                {data.isValidEmail ? null : (
                  <Text style={styles.errorMsg}>Invalid email format.</Text>
                )}
              </View>

              <View style={styles.inputWrapper}>
                <Text style={[styles.footer, { marginTop: 25 }]}>Phone</Text>
                <View style={styles.action}>
                  <Feather name="phone" size={20} />
                  <TextInput
                    placeholder="Your phone number"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val, "phone")}
                    onEndEditing={(e) => handleValidPhone(e.nativeEvent.text)}
                    keyboardType="number-pad"
                  />
                  {data.check_phoneInputChange ? (
                    <Feather name="check-circle" color="green" size={20} />
                  ) : null}
                </View>

                {data.isValidPhone ? null : (
                  <Text style={styles.errorMsg}>Invalid phone format.</Text>
                )}
              </View>

              <View style={styles.inputWrapper}>
                <Text style={[styles.footer, { marginTop: 25 }]}>Postcode</Text>
                <View style={styles.action}>
                  <FontAwesome name="home" size={20} />
                  <TextInput
                    placeholder="Postcode"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val, "postcode")}
                    onEndEditing={(e) =>
                      handleValidPostcode(e.nativeEvent.text)
                    }
                  />
                  {data.check_postcodeInputChange ? (
                    <Feather name="check-circle" color="green" size={20} />
                  ) : null}
                </View>

                {data.isValidPostcode ? null : (
                  <Text style={styles.errorMsg}>Invalid postcode format.</Text>
                )}
              </View>

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
                      <Feather name="eye-off" color="grey" size={25} />
                    ) : (
                      <Feather name="eye" color="grey" size={25} />
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
                      <Feather name="eye-off" color="grey" size={25} />
                    ) : (
                      <Feather name="eye" color="grey" size={25} />
                    )}
                  </TouchableOpacity>
                </View>
                {data.isValidPasswordMatch ? null : (
                  <Text style={styles.errorMsg}>Passwords must match.</Text>
                )}
              </View>

              <TouchableOpacity
                onPress={signUpHandler}
                style={[
                  styles.siginUp,
                  {
                    backgroundColor: "#000",
                  },
                ]}
              >
                <Text style={{ color: colours.default.accent }}>Sign Up</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("SignIn")}
                style={styles.signIn}
              >
                <Text>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </View>
  );
};

export default SignUp;

const { height } = Dimensions.get("screen");
const height_container = height * 0.45;

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
    width: "85%", //Platform.OS === "ios" ? "80%" : height_container,
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
  siginUp: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: colours.default.accent,
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
});
