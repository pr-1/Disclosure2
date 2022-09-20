import React from "react";
import {
  Platform,
  SafeAreaView,
  Button,
  View,
  Text,
  Image,
  Dimensions,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { ContactStackNavigator } from "./StackNavigator";
import TabNavigator from "./TabNavigator";

import Home from "../screens/Home";
import About from "../screens/About";
import Page1 from "../screens/Page1";
import Page2 from "../screens/Page2";
import StartupScreen from "../screens/StartupScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const categories = [
  { cat: "all" },
  { cat: "home" },
  { cat: "Food & Drink" },
  { cat: "Health & Lifestyle" },
  { cat: "Hair & Beauty" },
  { cat: "Family & Events" },
];

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require("../assets/icons/Home_icon.svg")}
    />
  );
}

const drawerOptions = {
  headerTintColor: "#fff",
  headerTitleStyle: {
    color: "#fff",
  },
  headerStyle: {
    backgroundColor: "#000",
  },
  headerTitle: (props) => <LogoTitle {...props} />,
  headerRight: () => (
    <Button
      onPress={() => alert("This is a button!")}
      title="Home"
      color="#fff"
    />
  ),
};

const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#c6cbef", //Drawer background
          color: "#fff",
          width: 240,
          activeTintColor: "#fff" /* font color for active screen label */,
          activeBackgroundColor: "#68f" /* bg color for active screen */,
          inactiveTintColor:
            "#fff" /* Font color for inactive screens' labels */,
        },
      }}
    >
      <Drawer.Screen name="Home" component={Home} options={drawerOptions} />
      <Drawer.Screen name="About" component={About} />
      <Drawer.Screen
        name="Page1"
        component={Page1}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="Page2"
        component={Page2}
        initialParams={{ cat: "cars" }}
        options={drawerOptions}
      />

      {categories.map((data) => (
        <Drawer.Screen
          key={data.cat}
          name={data.cat}
          component={Page2}
          initialParams={{ cat: data.cat }}
          options={drawerOptions}
        />
      ))}
    </Drawer.Navigator>
  );
};

// const screenOptionStyle = {
//   headerStyle: {
//     backgroundColor: "#9AC4F8",
//   },
//   headerTintColor: "white",
//   headerBackTitle: "Back",
// };

const ShopTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Disclosure" component={MainDrawerNavigator} />
    </Tab.Navigator>
  );
};

export default ShopTabNavigator;
