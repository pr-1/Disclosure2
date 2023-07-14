import React, { useContext } from "react";
import { Image, TouchableOpacity, Text } from "react-native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabBar from "../components/UI/BottomTabBar";
import CustomDrawer from "../components/UI/CustomDrawer";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";

import * as RootNavigation from "./RootNavigation";
import { AuthContext } from "../components/context";

import Home from "../screens/Home";
import MemberId from "../screens/MemberId";
import Categories from "../screens/Categories";
import Category from "../screens/Category";
import Profile from "../screens/Profile";
import CompanyDetails from "../screens/CompanyDetails";
import ResetPassword from "../screens/ResetPassword";
import Magazine from "../screens/Magazine";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 180, height: 44, resizeMode: "cover", marginBottom: 15 }}
      source={require("../assets/icons/disclosure_logo.jpg")}
    />
  );
}

const backButtonHandler = (pageOrigin, removePageFromStack) => {
  removePageFromStack();
  RootNavigation.navigate(pageOrigin);
};

const drawerOptions = {
  headerTintColor: "#fff",
  headerTitleStyle: {
    color: "#fff",
  },
  headerStyle: {
    backgroundColor: "#000",
    borderBottomColor: Colors.accent,
    borderBottomWidth: 5,
  },
  headerTitleAlign: "center",
  activeTintColor: "#fff",
  inactiveTintColor: "#fff",
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

const categoryOptions = (pageOrigin, removePageFromStack) => {
  return {
    headerTintColor: "#fff",
    headerTitleStyle: {
      color: "#fff",
    },
    headerStyle: {
      backgroundColor: "#000",
      borderBottomColor: Colors.accent,
      borderBottomWidth: 5,
    },
    headerTitleAlign: "center",
    activeTintColor: "#fff",
    inactiveTintColor: "#fff",
    drawerActiveTintColor: "#fff",
    drawerInactiveTintColor: "#fff",
    drawerItemStyle: {
      marginLeft: 20,
    },
    unmountOnBlur: true,
    headerShown: true,
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => backButtonHandler(pageOrigin, removePageFromStack)}
      >
        <AntDesign name="leftcircleo" color="white" size={30} />
      </TouchableOpacity>
    ),
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
};

const MainDrawerNavigator = () => {
  const { pageStack, removePageFromStack } = useContext(AuthContext);

  let page = pageStack.at(-1);

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
        options={() => categoryOptions(page, removePageFromStack)}
      />
      <Drawer.Screen
        name="All Discounts"
        component={Category}
        initialParams={{ cat: "all" }}
        options={() => categoryOptions(page, removePageFromStack)}
      />
      <Drawer.Screen
        name="Directory"
        component={Category}
        initialParams={{ cat: "a-z" }}
        options={() => categoryOptions(page, removePageFromStack)}
      />
      <Drawer.Screen
        name="category"
        component={Category}
        options={() => categoryOptions(page, removePageFromStack)}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={drawerOptions}
      />
      <Drawer.Screen
        name="CompanyDetails"
        component={CompanyDetails}
        options={() => categoryOptions(page, removePageFromStack)}
      />
      <Drawer.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={drawerOptions}
      />
      <Drawer.Screen
        name="Magazine"
        component={Magazine}
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
