import React from "react";
import { Image, TouchableOpacity } from "react-native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomTabBar from "../components/UI/BottomTabBar";
import CustomDrawer from "../components/UI/CustomDrawer";

import * as RootNavigation from "./RootNavigation";

import Home from "../screens/Home";
import MemberId from "../screens/MemberId";
import Categories from "../screens/Categories";
import Category from "../screens/Category";
import Profile from "../screens/Profile";
import CompanyDetails from "../screens/CompanyDetails";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 160, height: 44, resizeMode: "cover" }}
      source={require("../assets/icons/DisclosureLogo.jpg")}
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
  headerTitleAlign: "center",
  drawerActiveTintColor: "#fff",
  drawerInactiveTintColor: "#fff",
  drawerItemStyle: { marginLeft: 20 },
  unmountOnBlur: true,
  headerTitle: (props) => <LogoTitle {...props} />,
  headerRight: () => (
    <TouchableOpacity onPress={() => RootNavigation.navigate("Home")}>
      <Image
        style={{ width: 35, height: 35 }}
        source={require("../assets/icons/Home_icon.png")}
      />
    </TouchableOpacity>
  ),
};

const dynamicOptionsList = {
  headerTintColor: "#fff",
  headerTitleStyle: {
    color: "#fff",
  },
  headerStyle: {
    backgroundColor: "#000",
  },
  headerTitleAlign: "center",
  drawerActiveTintColor: "#fff",
  drawerInactiveTintColor: "#fff",
  drawerItemStyle: { marginLeft: 50 },
  unmountOnBlur: true,
  headerTitle: (props) => <LogoTitle {...props} />,
  headerRight: () => (
    <TouchableOpacity
      onPress={() => RootNavigation.navigate("Member ID", { userName: "Lucy" })}
    >
      <Image
        style={{ width: 35, height: 35 }}
        source={require("../assets/icons/Home_icon.png")}
      />
    </TouchableOpacity>
  ),
};

const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Home" component={Home} options={drawerOptions} />
      <Drawer.Screen
        name="Member ID"
        component={MemberId}
        options={drawerOptions}
      />
      <Drawer.Screen
        name="Categories"
        component={Categories}
        options={drawerOptions}
      />
      <Drawer.Screen
        name="All Discounts"
        component={Category}
        initialParams={{ cat: "all" }}
        options={drawerOptions}
      />
      <Drawer.Screen
        name="Directory"
        component={Category}
        initialParams={{ cat: "a-z" }}
        options={drawerOptions}
      />
      <Drawer.Screen
        name="category"
        component={Category}
        options={drawerOptions}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={drawerOptions}
      />
      <Drawer.Screen
        name="CompanyDetails"
        component={CompanyDetails}
        options={drawerOptions}
      />
    </Drawer.Navigator>
  );
};

const ShopTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tab.Screen name="Disclosure" component={MainDrawerNavigator} />
    </Tab.Navigator>
  );
};

export default ShopTabNavigator;
