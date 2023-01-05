import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import * as RootNavigation from "../navigation/RootNavigation";
import { Divider } from "react-native-elements";
import Colors from "../constants/Colors";

const width = Dimensions.get("window").width;

const Categories = () => {
  const categories = useSelector((state) => state.products.categories);

  const header = () => {
    return (
      <View>
        <Text style={styles.title}>Categories</Text>
      </View>
    );
  };

  const separator = () => {
    return (
      <Divider
        orientation="vertical"
        color={Colors.accent}
        style={{ width: "80%", margin: 20 }}
      />
    );
  };

  if (!categories.length) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.center}>
        <FlatList
          ListHeaderComponent={header}
          ItemSeparatorComponent={separator}
          data={categories}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                RootNavigation.navigate("category", { cat: item.name });
              }}
            >
              <View style={styles.categoriesWrapper}>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.imageThumbnail}
                    source={{ uri: item.url }}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.itemText}>{item.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  imageContainer: {
    margin: 1,
    maxWidth: width > 600 ? 200 : 100,
  },
  imageThumbnail: {
    backgroundColor: "white",
    width: (width - 100) / 3,
    height: width > 600 ? 200 : 100,
    resizeMode: "contain",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    alignSelf: "center",
    fontSize: 30,
    fontFamily: "Kollektif",
    marginVertical: 30,
  },
  categoriesWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: (width - 100) / 3,
    maxWidth: width > 600 ? 250 : 100,
    marginHorizontal: 10,
  },
  itemText: {
    fontSize: width > 600 ? 25 : 14,
  },
});

export default Categories;
