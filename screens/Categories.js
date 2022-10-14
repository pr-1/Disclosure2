import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import * as RootNavigation from "../navigation/RootNavigation";

const myData = [
  {
    name: "All Categories",
    src: require("../assets/icons/all.png"),
    cat: "All Categories",
  },
  { name: "Home", src: require("../assets/icons/home.png"), cat: "Homes" },
  {
    name: "Food & Drink",
    src: require("../assets/icons/food.png"),
    cat: "Food & Drink",
  },
  {
    name: "Health & Lifestyle",
    src: require("../assets/icons/health.png"),
    cat: "Health & Lifestyle",
  },
  {
    name: "Hair & Beauty",
    src: require("../assets/icons/hair.png"),
    cat: "Hair & Beauty",
  },
  {
    name: "Family & Events",
    src: require("../assets/icons/family.png"),
    cat: "Family & Events",
  },
  {
    name: "Fashion & Shopping",
    src: require("../assets/icons/fashion.png"),
    cat: "Fashion & Sopping",
  },
  {
    name: "Business",
    src: require("../assets/icons/business.png"),
    cat: "Business",
  },
  {
    name: "Car & Motoring",
    src: require("../assets/icons/car.png"),
    cat: "Car & Motoring",
  },
];

const Categories = () => {
  return (
    <SafeAreaView style={styles.center}>
      <Text>This is Categories screen</Text>
      <FlatList
        data={myData}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              RootNavigation.navigate(item.cat);
            }}
          >
            <View style={styles.imageContainer}>
              <Image style={styles.imageThumbnail} source={item.src} />
            </View>
            <View style={styles.textContainer}>
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    position: "absolute",
    alignItems: "center",
    bottom: 0,
  },
  imageContainer: {
    flex: 1,
    flexDirection: "column",
    margin: 1,
  },
  imageThumbnail: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "white",
    width: "100%",
    height: 80,
    resizeMode: "cover",
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
