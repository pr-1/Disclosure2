import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Platform,
  TextInput,
  Button,
} from "react-native";
import { useDispatch } from "react-redux";
import * as Colors from "../constants/Colors";
import { Entypo, FontAwesome, Fontisto, Feather } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RadioButton } from "react-native-paper";
import * as auth from "../store/actions/auth";
import AsyncAlert from "../components/UI/AsyncAlert";
import { AuthContext } from "../components/context";

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
    dob: "",
    gender: "",
    mailinglist: false,
    password: "",
    confirmPassword: "",
    passwordStrength: 0,
    passwordMessage: "",
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
    isValidDateOfBirth: true,
    isValidGender: true,
    color: "grey",
  });
  const { signUp } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [form, setForm] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [gender, setGender] = useState();
  const [mailingList, setMailingList] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function customAlert() {
      if (error) {
        await AsyncAlert("An error occured", error);
        if (error === "This email exists already") {
          navigation.navigate("SignIn");
        }
      }
    }

    customAlert();
  }, [error]);

  const checkBoxHandler = () => {
    setMailingList(!mailingList);
    setData({
      ...data,
      mailinglist: !data.mailinglist,
    });
  };

  function showDatePicker() {
    setDatePicker(true);
  }

  function onDateSelected(event, value) {
    setDate(value);
    setData({
      ...data,
      dob: value,
      isValidDateOfBirth: true,
    });
    setDatePicker(false);
  }

  useEffect(() => {
    setData({
      ...data,
      gender: gender,
      isValidGender: true,
    });
  }, [gender]);

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
    if (
      data.check_nameInputChange &&
      data.check_textInputChange &&
      data.check_phoneInputChange &&
      data.check_postcodeInputChange &&
      data.check_passwordInputChange &&
      data.dob &&
      data.gender
    ) {
      setForm(true);
    } else {
      setForm(false);
    }
  }, [data]);

  const signUpHandler = async () => {
    if (data.dob === "") {
      setData({ ...data, isValidDateOfBirth: false });
    }
    if (data.gender === "") {
      setData({ ...data, isValidGender: false });
    }
    if (data.password === data.confirmPassword) {
      setData({
        ...data,
        passwordMessage: "Passwords must match",
      });
    }

    if (form && data.passwordStrength != "red") {
      try {
        const response = await dispatch(
          auth.signup(
            data.fname,
            data.lname,
            data.email,
            data.phone,
            data.password,
            data.postcode.toUpperCase(),
            data.dob,
            data.gender,
            data.mailinglist
          )
        );

        signUp(response);

        navigation.navigate("Validate");
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
              <Text style={styles.title}>Sign Up</Text>

              <View style={styles.inputWrapper}>
                <Text style={styles.footer}>Full Name</Text>
                <View style={styles.action}>
                  <FontAwesome name="user-o" size={20} />
                  <TextInput
                    placeholder="Your full name"
                    style={styles.textInput}
                    autoCapitalize="words"
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
                    keyboardType="email-address"
                    textContentType="emailAddress"
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
                    autoCapitalize="characters"
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
                <Text style={[styles.footer, { marginTop: 25 }]}>
                  Date of Birth
                </Text>
                <View>
                  <TouchableOpacity
                    onPress={showDatePicker}
                    style={styles.dobAction}
                  >
                    <Fontisto name="date" size={20} />

                    <Text style={data.dob ? styles.textInput : styles.text}>
                      {data.dob ? date.toDateString() : "Date of Birth"}
                    </Text>
                  </TouchableOpacity>

                  {datePicker && (
                    <>
                      <DateTimePicker
                        value={date}
                        mode="date"
                        display={Platform.OS === "ios" ? "inline" : "default"}
                        onChange={onDateSelected}
                        style={styles.datePicker}
                        maximumDate={new Date()}
                      />
                      {Platform.OS === "ios" && (
                        <Button
                          title="Close"
                          onPress={() => {
                            setDatePicker(false);
                          }}
                        />
                      )}
                    </>
                  )}
                </View>

                {data.isValidDateOfBirth ? null : (
                  <Text style={styles.errorMsg}>Invalid date of birth.</Text>
                )}
              </View>

              <View style={styles.inputWrapper}>
                <Text style={[styles.footer, { marginTop: 25 }]}>
                  Gender (Click to select)
                </Text>

                <View style={styles.action}>
                  <Fontisto name="transgender-alt" size={20} />
                  <View style={styles.radioButtonContainer}>
                    <View style={styles.genderButtons}>
                      <RadioButton
                        uncheckedColor="black"
                        color={Colors.accent}
                        value="male"
                        label="Male"
                        status={gender === "male" ? "checked" : "unchecked"}
                        onPress={() => {
                          setGender("male");
                        }}
                      />
                      <TouchableOpacity
                        style={styles.genderButtonLabel}
                        onPress={() => {
                          setGender("male");
                        }}
                      >
                        <Text style={styles.genderButtonLabelText}>Male</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.genderButtons}>
                      <RadioButton
                        uncheckedColor="black"
                        color={Colors.accent}
                        label="Female"
                        value="female"
                        status={gender === "female" ? "checked" : "unchecked"}
                        onPress={() => {
                          setGender("female");
                        }}
                      />
                      <TouchableOpacity
                        style={styles.genderButtonLabel}
                        onPress={() => {
                          setGender("female");
                        }}
                      >
                        <Text style={styles.genderButtonLabelText}>Female</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.genderButtons}>
                      <RadioButton
                        uncheckedColor="black"
                        color={Colors.accent}
                        label="Other"
                        value="other"
                        status={gender === "other" ? "checked" : "unchecked"}
                        onPress={() => {
                          setGender("other");
                        }}
                      />
                      <TouchableOpacity
                        style={styles.genderButtonLabel}
                        onPress={() => {
                          setGender("other");
                        }}
                      >
                        <Text style={styles.genderButtonLabelText}>Other</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                {data.isValidGender ? null : (
                  <Text style={styles.errorMsg}>Please select a gender.</Text>
                )}
              </View>

              <View style={styles.inputWrapper}>
                <Text style={[styles.footer, { marginTop: 25 }]}>
                  Mailinglist
                </Text>
                <TouchableOpacity onPress={checkBoxHandler}>
                  <View style={styles.action}>
                    <Entypo name="newsletter" size={20} />
                    {data.mailinglist ? (
                      <View style={styles.checked}>
                        <View></View>
                        <Text style={styles.textCheckbox}>
                          Thank you for signing up
                        </Text>
                        <Feather
                          name="check-circle"
                          color={Colors.default.accent}
                          size={20}
                        />
                      </View>
                    ) : (
                      <View style={styles.unchecked}>
                        <Text style={styles.textCheckbox}>
                          Receive the latest new and offers
                        </Text>
                      </View>
                    )}
                    <View></View>
                  </View>
                </TouchableOpacity>
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
                onPress={signUpHandler}
                style={[
                  styles.siginUp,
                  {
                    backgroundColor: "#000",
                  },
                ]}
              >
                <Text style={{ color: Colors.default.accent }}>Sign Up</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("SignIn")}
                style={styles.signIn}
              >
                <Text>Have an account? Sign in here.</Text>
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
