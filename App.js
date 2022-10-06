import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./navigation/RootNavigation";
import ShopTabNavigator from "./navigation/ShopTabNavigator";

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar style="light" />
      <ShopTabNavigator />
    </NavigationContainer>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
