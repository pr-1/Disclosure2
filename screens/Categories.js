import { createIconSetFromFontello } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

const myData = [
  { name: "All Categories", src: require("../assets/icons/all.png") },
  { name: "Home", src: require("../assets/icons/home.png") },
  { name: "Food & Drink", src: require("../assets/icons/food.png") },
  { name: "Health & Lifestyle", src: require("../assets/icons/health.png") },
  { name: "Hair & Beauty", src: require("../assets/icons/hair.png") },
  { name: "Family & Events", src: require("../assets/icons/family.png") },
  { name: "Fashion & Shopping", src: require("../assets/icons/fashion.png") },
  { name: "Business", src: require("../assets/icons/business.png") },
  { name: "Car & Motoring", src: require("../assets/icons/car.png") },
];

const Categories = () => {
  return (
    <View style={styles.center}>
      <Text>This is Categories screen</Text>
      <FlatList
        data={myData}
        numColumns={3}
        renderItem={({ item }) => (
          <View>
            <View style={styles.imageContainer}>
              <Image
                style={{ width: 50, height: 50, resizeMode: "cover" }}
                source={item.src}
              />
            </View>
            <View style={styles.textContainer}>
              <Text>{item.name}</Text>
            </View>
          </View>
        )}
      />
    </View>
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  iconBehave: {
    padding: 14,
  },
});

export default Categories;
