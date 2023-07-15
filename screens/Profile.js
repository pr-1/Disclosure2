import React, { useEffect, useState, useContext, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  Platform,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Colors from "../constants/Colors";
import {
  Entypo,
  FontAwesome,
  Fontisto,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
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

function useAsyncRef(initialState) {
  const state = useRef(initialState);
  const [, forceRender] = useState(false);

  function updateState(newState) {
    state.current = newState;
    forceRender((s) => !s);
  }
  return [state, updateState];
}

const Profile = ({ navigation }) => {
  const [data, setData] = useAsyncRef({
    fname: "",
    lname: "",
    email: "",
    // phone: "",
    postcode: "",
    // dob: "",
    gender: "",
    mailinglist: false,
    check_nameInputChange: false,
    check_textInputChange: false,
    // check_phoneInputChange: false,
    check_postcodeInputChange: false,
    secureTextEntry: true,
    confirmSecureTextEntry: true,
    isValidName: true,
    isValidEmail: true,
    // isValidPhone: true,
    isValidPostcode: true,
    // isValidDateOfBirth: true,
    isValidGender: true,
    color: "grey",
  });
  const { signIn, signOut } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [form, setForm] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [gender, setGender] = useState();
  const [mailingList, setMailingList] = useState(false);
  const [error, setError] = useState("");

  const user = useSelector((state) => state.auth);

  useEffect(() => {
    async function customAlert() {
      if (error) {
        await AsyncAlert("An error occured", error);
      }
    }

    customAlert();
  }, [error]);

  useEffect(() => {
    if (user) {
      setData({
        ...data.current,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        phone: user.phone,
        postcode: user.postcode,
        dob: user.dob,
        gender: user.gender,
        mailinglist: user.mailingList === 1 ? true : false,
        check_nameInputChange: true,
        check_textInputChange: true,
        check_phoneInputChange: true,
        check_postcodeInputChange: true,
        check_passwordInputChange: true,
      });
      setDate(new Date(user.dob));
      setGender(user.gender);
      setMailingList(user.mailingList === 1 ? true : false);
    }
  }, [user]);

  const checkBoxHandler = () => {
    setMailingList(!mailingList);
    setData({
      ...data.current,
      mailinglist: !data.mailinglist,
    });
  };

  // function showDatePicker() {
  //   setDatePicker(true);
  // }

  // function onDateSelected(event, value) {
  //   setDate(value);
  //   setData({
  //     ...data.current,
  //     dob: value,
  //     isValidDateOfBirth: true,
  //   });
  //   setDatePicker(false);
  // }

  useEffect(() => {
    setData({
      ...data.current,
      gender: gender,
      isValidGender: true,
    });
  }, [gender]);

  const textInputChange = (val, type) => {
    switch (type) {
      case "email":
        if (val.length !== 0 && emailRegex.test(val.toLowerCase())) {
          setData({
            ...data.current,
            email: val,
            check_textInputChange: true,
          });
        } else {
          setData({
            ...data.current,
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
              ...data.current,
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
            ...data.current,
            fname: fname,
            lname: lname,
            check_nameInputChange: true,
          });
        } else {
          fname = "";
          lname = "";
          setData({
            ...data.current,
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
            ...data.current,
            phone: val,
            check_phoneInputChange: true,
          });
        } else {
          setData({
            ...data.current,
            phone: val,
            check_phoneInputChange: false,
          });
        }
        break;

      case "postcode":
        if (val.length !== 0 && postcodeRegex.test(val.toUpperCase())) {
          if (val.length > 6) {
            if (validate(val)) {
              setData({
                ...data.current,
                postcode: val,
                check_postcodeInputChange: true,
              });
            } else {
              setData({
                ...data.current,
                postcode: "",
                check_postcodeInputChange: false,
              });
            }
          } else {
            setData({
              ...data.current,
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
        ...data.current,
        isValidName: true,
      });
    } else {
      setData({
        ...data.current,
        isValidName: false,
      });
    }
  };

  const handleValidEmail = (val) => {
    if (val.trim().length >= 4 && emailRegex.test(val.toLowerCase())) {
      setData({
        ...data.current,
        isValidEmail: true,
      });
    } else {
      setData({
        ...data.current,
        isValidEmail: false,
      });
    }
  };

  // const handleValidPhone = (val) => {
  //   if (val.trim().length >= 10 && phoneRegex.test(val)) {
  //     setData({
  //       ...data.current,
  //       isValidPhone: true,
  //     });
  //   } else {
  //     setData({
  //       ...data.current,
  //       isValidPhone: false,
  //     });
  //   }
  // };

  const handleValidPostcode = (val) => {
    if (val.trim().length >= 6 && postcodeRegex.test(val.toUpperCase())) {
      setData({
        ...data.current,
        isValidPostcode: true,
      });
    } else {
      setData({
        ...data.current,
        isValidPostcode: false,
      });
    }
  };

  useEffect(() => {
    if (
      data.current.check_nameInputChange &&
      data.current.check_textInputChange &&
      data.current.check_phoneInputChange &&
      data.current.check_postcodeInputChange &&
      data.current.dob &&
      data.current.gender
    ) {
      setForm(true);
    } else {
      setForm(false);
    }
  }, [data]);

  const updateHandler = async () => {
    // if (data.dob === "") {
    //   setData({ ...data.current, isValidDateOfBirth: false });
    // }
    if (data.gender === "") {
      setData({ ...data.current, isValidGender: false });
    }

    if (form && user?.token) {
      try {
        const response = await dispatch(
          auth.update(
            data.current.fname,
            data.current.lname,
            data.current.email,
            data.current.phone,
            data.current.postcode.toUpperCase(),
            data.current.dob,
            data.current.gender,
            data.current.mailinglist,
            user.userId,
            user.token
          )
        );
        signIn(response);
        Alert.alert("Profile updated successfully", "", [{ text: "Ok" }]);
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError("Incorrect Information!", "Please correct the errors");
    }
  };

  const deleteProfileHandler = () => {
    if (user.token) {
      Alert.alert(
        "Delete Profile",
        "Are you sure you want to delete your profile?",
        [
          {
            text: "No",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              dispatch(auth.deleteProfile(user.token));
              dispatch(auth.logout());
              signOut();
            },
          },
        ]
      );
    } else {
      Alert.alert("Something went wrong", "No user token", [{ text: "Ok" }]);
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
              <Text style={styles.title}>Update profile</Text>

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
                    value={data.current.fname + " " + data.current.lname}
                  />
                  {data.current.check_nameInputChange ? (
                    <Feather name="check-circle" color="green" size={20} />
                  ) : null}
                </View>

                {data.current.isValidName ? null : (
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
                    value={data.current.email}
                  />
                  {data.current.check_textInputChange ? (
                    <Feather name="check-circle" color="green" size={20} />
                  ) : null}
                </View>

                {data.current.isValidEmail ? null : (
                  <Text style={styles.errorMsg}>Invalid email format.</Text>
                )}
              </View>

              {/* <View style={styles.inputWrapper}>
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
                    value={data.current.phone}
                  />
                  {data.current.check_phoneInputChange ? (
                    <Feather name="check-circle" color="green" size={20} />
                  ) : null}
                </View>

                {data.current.isValidPhone ? null : (
                  <Text style={styles.errorMsg}>Invalid phone format.</Text>
                )}
              </View> */}

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
                    value={data.current.postcode}
                  />
                  {data.current.check_postcodeInputChange ? (
                    <Feather name="check-circle" color="green" size={20} />
                  ) : null}
                </View>

                {data.current.isValidPostcode ? null : (
                  <Text style={styles.errorMsg}>Invalid postcode format.</Text>
                )}
              </View>
              {/* <View style={styles.inputWrapper}>
                <Text style={[styles.footer, { marginTop: 25 }]}>
                  Date of Birth
                </Text>
                <View>
                  <TouchableOpacity
                    onPress={showDatePicker}
                    style={styles.dobAction}
                  >
                    <Fontisto name="date" size={20} />

                    <Text
                      style={data.current.dob ? styles.textInput : styles.text}
                    >
                      {data.current.dob ? date.toDateString() : "Date of Birth"}
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
                        themeVariant="light"
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

                {data.current.isValidDateOfBirth ? null : (
                  <Text style={styles.errorMsg}>Invalid date of birth.</Text>
                )}
              </View> */}

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
                {data.current.isValidGender ? null : (
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
                    {data.current.mailinglist ? (
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

              <TouchableOpacity
                onPress={updateHandler}
                style={[
                  styles.siginUp,
                  {
                    backgroundColor: "#000",
                  },
                ]}
              >
                <Text style={{ color: Colors.default.accent }}>
                  Update Profile
                </Text>
              </TouchableOpacity>

              <View style={styles.otherButtonsContainer}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ResetPassword");
                  }}
                  style={styles.bottomButtons}
                >
                  <View>
                    <FontAwesome name="stack-exchange" size={20} />
                  </View>
                  <Text style={{ color: Colors.default.accent }}>
                    Reset Password
                  </Text>
                  <View style={{ width: 30 }}></View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={deleteProfileHandler}
                  style={styles.bottomButtons}
                >
                  <View>
                    <AntDesign name="delete" size={20} />
                  </View>
                  <Text style={{ color: Colors.default.accent }}>
                    Delete Profile
                  </Text>
                  <View style={{ width: 30 }}></View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    marginBottom: 80,
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
    fontSize: 35,
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
    alignItems: "center",
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
  otherButtonsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomButtons: {
    width: "46%",
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    borderColor: Colors.accent,
    borderWidth: 1,
    marginTop: 15,
    paddingLeft: 10,
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
    alignSelf: "center",
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
  checked: {
    flexDirection: "row",
    lineHeight: 25,
    justifyContent: "space-between",
    width: "95%",
  },
});
