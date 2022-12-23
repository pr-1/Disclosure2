import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useSelector } from "react-redux";

import { AuthContext } from "../context";
import MenuItem from "./MenuItem";

const CustomDrawer = (props) => {
  const { signOut } = useContext(AuthContext);
  const cats = useSelector((state) => state.products.categories);

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#888" }}
      >
        <ImageBackground
          source={require("../../assets/profileImages/medium.jpg")}
          style={{ padding: 20 }}
        >
          <Image
            source={require("../../assets/profileImages/howling-red-OU2vFQCwCD0-unsplash.jpg")}
            style={{
              height: 60,
              width: 60,
              borderRadius: 30,
              marginBottom: 10,
            }}
          />
          <Text>Alan Luckett</Text>
        </ImageBackground>

        <View style={styles.drawerItems}>
          <MenuItem
            name="Home"
            target="Home"
            cat=""
            navigation={props.navigation}
            state={props.state}
          />
          <MenuItem
            name="Member ID"
            target="Member ID"
            cat=""
            navigation={props.navigation}
            state={props.state}
          />
          <MenuItem
            name="Categories"
            target="Categories"
            cat=""
            navigation={props.navigation}
            state={props.state}
          />
          {cats.map((data) => (
            <MenuItem
              key={data.id}
              name={data.name}
              target="category"
              cat={data.name}
              navigation={props.navigation}
              state={props.state}
              labelStyle={styles.categoryItems}
              wrapperStyle={{ paddingVertical: 10 }}
            />
          ))}
          <MenuItem
            name="All discounts"
            target="All Discounts"
            cat=""
            navigation={props.navigation}
            state={props.state}
          />
          <MenuItem
            name="Directory"
            target="Directory"
            cat=""
            navigation={props.navigation}
            state={props.state}
          />
          <MenuItem
            name="Magazine"
            target="Magazine"
            cat=""
            navigation={props.navigation}
            state={props.state}
          />
        </View>
        <View style={styles.bottomSection}>
          <MenuItem
            name="Profile Settings"
            target="Profile"
            cat=""
            navigation={props.navigation}
            state={props.state}
          />
          <TouchableOpacity
            onPress={() => {
              signOut();
            }}
            style={styles.bottomButtonsWrapper}
          >
            <View style={styles.bottomButton}>
              <Text style={styles.bottomButtonText}>Sign Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerItems: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 10,
    color: "#fff",
  },
  bottomSection: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    marginBottom: 80,
    backgroundColor: "#000",
  },
  bottomSectionText: {
    color: "#fff",
  },
  bottomButtonsWrapper: {
    paddingVertical: 15,
  },
  bottomButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  bottomButtonText: {
    fontSize: 15,
    color: "#fff",
  },
  categoryItems: {
    marginLeft: 30,
    fontSize: 12,
  },
});

export default CustomDrawer;
