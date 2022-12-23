import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as RootNavigation from "../navigation/RootNavigation";

import AsyncStorage from "@react-native-async-storage/async-storage";

import * as productsActions from "../store/actions/products";
import * as auth from "../store/actions/auth";

import CompanyLink from "../components/UI/CompanyLink";

const Category = ({ route }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const products = useSelector((state) => state.products.availableProducts);
  const maxCount = useSelector((state) => state.products.count);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log({ e });
      }

      const { idToken } = JSON.parse(userToken);

      dispatch(auth.reRegister(JSON.parse(userToken)));
      dispatch(
        productsActions.fetchProducts(
          0, //Long
          0, //Lat
          "", //Filter
          "", //Search Value
          page,
          route.params.cat, //Category
          idToken,
          "clear"
        )
      );
    }, 1);
  }, [route.params.cat, page]);

  return (
    <View style={styles.center}>
      <Text>This is Category and the category = {route.params.cat}</Text>
      <CompanyLink
        name="Simply Race"
        offer="10% off"
        validDate="December 2023"
        town="Milton Keynes"
        distance="23.5"
        logoUrl="https://disclosureapp.s3.eu-west-2.amazonaws.com/disclosure/offers_images/0fd761c1e298e1c89eb0730a3d6bf8a4.jpeg"
        discountAvailable="true"
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

export default Category;
