import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as Linking from "expo-linking";
import { AuthContext } from "../context";
import * as ProductActions from "../../store/actions/products";

const BottomTabBar = ({ navigation }) => {
  const url = useSelector((state) => state.magazine.magazine);
  const [magazineUrl, setMagazineUrl] = useState("");
  const { toggleSearch, search } = useContext(AuthContext);

  const dispatch = useDispatch();

  useEffect(() => {
    if (url.length > 0) {
      setMagazineUrl(url[0].url);
    }
  }, [url]);

  const searchButtonHandler = () => {
    toggleSearch();
    if (!search) {
      dispatch(ProductActions.clearSearchResults());
    }
  };

  const navigationHandler = (page) => {
    if (search) {
      toggleSearch();
    }
    navigation.navigate(page);
  };

  return (
    <>
      <View style={styles.navContainer}>
        <View style={styles.bottomTabButtons}>
          <TouchableOpacity
            onPress={() => navigationHandler("Member ID")}
            style={styles.iconBehave}
          >
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../assets/icons/personIcon.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigationHandler("Categories")}
            style={styles.iconBehave}
          >
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../assets/icons/categoryIcon.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigationHandler("Magazine")}
            style={styles.iconBehave}
          >
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../assets/icons/magazineIcon.png")}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => Linking.openURL(magazineUrl)}
            style={styles.iconBehave}
          ></TouchableOpacity> */}

          <TouchableOpacity
            onPress={searchButtonHandler}
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
