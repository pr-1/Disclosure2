import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BottomTabBar = ({ navigation }) => {
  return (
    <>
      <View style={styles.navContainer}>
        <View style={styles.bottomTabButtons}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Member ID")}
            style={styles.iconBehave}
          >
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../assets/icons/personIcon.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Categories")}
            style={styles.iconBehave}
          >
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../assets/icons/categoryIcon.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Magazine")}
            style={styles.iconBehave}
          >
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../assets/icons/magazineIcon.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => console.log("Search icon clicked")}
            style={styles.iconBehave}
          >
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../assets/icons/searchIcon.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    position: "absolute",
    alignItems: "center",
    bottom: 0,
  },
  bottomTabButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    backgroundColor: "#000",
    height: 80,
    paddingTop: 10,
  },
  iconBehave: {
    padding: 14,
  },
});

export default BottomTabBar;
