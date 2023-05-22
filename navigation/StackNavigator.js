// ./navigation/StackNavigator.js

import React from "react";
import { Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import StartUp from "../screens/StartupScreen";
import Validate from "../screens/Validate";
import Forgotten from "../screens/Forgotten";

const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 160, height: 44, marginBottom: 10, resizeMode: "cover" }}
      source={require("../assets/icons/DisclosureLogo.jpg")}
    />
  );
}

const screenOptionStyle = {
  headerShown: "false",
  headerTitleAlign: "center",
  headerTitle: (props) => <LogoTitle {...props} />,
  headerStyle: {
    backgroundColor: "#000",
  },
  headerTintColor: "white",
};

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="StartUp" component={StartUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Validate" component={Validate} />
      <Stack.Screen name="ForgottenPassword" component={Forgotten} />
    </Stack.Navigator>
  );
};

export { AuthStackNavigator };
