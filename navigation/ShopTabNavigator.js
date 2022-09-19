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

const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
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
      />

      {categories.map((data) => (
        <Drawer.Screen
          key={data.cat}
          name={data.cat}
          component={Page2}
          initialParams={{ cat: data.cat }}
        />
      ))}
    </Drawer.Navigator>
  );
};

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const ShopTabNavigator = () => {
  return (
    // <Stack.Navigator>
    //   <Stack.Screen name="Disclosure" component={MainDrawerNavigator} />
    //   {/* <Stack.Screen name="StartupScreen" component={StartupScreen} /> */}
    //   <Stack.Screen name="About" component={About} />
    // </Stack.Navigator>

    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Disclosure" component={MainDrawerNavigator} />
      {/* <Tab.Screen name="About" component={About} />
      <Tab.Screen name="Page1" component={Page1} />
      <Tab.Screen name="Page2" component={Page2} /> */}
    </Tab.Navigator>
  );
};

export default ShopTabNavigator;
