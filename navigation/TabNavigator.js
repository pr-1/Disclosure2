// ./navigation/TabNavigator.js

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { ProfileStackNavigator, ProductStackNavigator } from "./StackNavigator";
import Page1 from "../screens/Page1";
import Page2 from "../screens/Page2";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
      <Tab.Screen name="Product" component={ProductStackNavigator} />
      <Tab.Screen name="Page1" component={Page1} />
      <Tab.Screen name="Page2" component={Page2} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
