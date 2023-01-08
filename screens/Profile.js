// ./screens/Home.js
import React, {
  useReducer,
  useCallback,
  useState,
  useEffect,
  useRef,
} from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  Alert,
  Platform,
  Text,
  TouchableOpacity,
  Dimensions,
  Button,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

const Profile = ({ navigation }) => {
  return (
    <View style={styles.center}>
      <Text>This is the Profile screen</Text>
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

export default Profile;
