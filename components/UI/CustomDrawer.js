import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useSelector } from "react-redux";
import * as RootNavigation from "./../../navigation/RootNavigation";
import * as Linking from "expo-linking";

import { AuthContext } from "../context";
import MenuItem from "./MenuItem";
import Colors from "../../constants/Colors";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

const CustomDrawer = (props) => {
  const { signOut } = useContext(AuthContext);
  const user = useSelector((state) => state.auth);
  const cats = useSelector((state) => state.products.categories);
  const url = useSelector((state) => state.magazine.magazine);
  const [magazineUrl, setMagazineUrl] = useState("");

  useEffect(() => {
    if (url.length > 0) {
      setMagazineUrl(url[0].url);
    }
  }, [url]);

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          backgroundColor: "#ccc",
          minHeight: height + 150,
        }}
      >
        <View style={styles.navWrapper}>
          <TouchableOpacity
            onPress={() => {
              RootNavigation.navigate("Profile");
            }}
            style={styles.headerContainer}
          >
            <View style={styles.nameTextContainer}>
              <Text style={styles.nameText}>
                {user?.fname} {user?.lname}
              </Text>
            </View>
          </TouchableOpacity>

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
              target="category"
              cat="all"
              navigation={props.navigation}
              state={props.state}
            />
            <MenuItem
              name="Directory"
              target="category"
              cat="a-z"
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
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://thedisclosurehub.co.uk/contact");
              }}
              style={styles.signUpWrapper}
            >
              <View style={styles.signUp}>
                <Text style={styles.signUpText}>
                  Click here to advertise your company on this app
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height + 50,
  },
  navWrapper: {
    height: height,
    backgroundColor: "black",
    paddingBottom: 100,
  },
  headerContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: Colors.accent,
    borderBottomWidth: 2,
    backgroundColor: "#ccc",
  },
  userImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  nameTextContainer: {
    marginLeft: 20,
    marginBottom: 12,
  },
  nameText: {
    fontSize: 18,
  },
  drawerItems: {
    backgroundColor: "#000",
    paddingTop: 10,
    color: "#fff",
  },
  bottomSection: {
    borderTopWidth: 1,
    borderTopColor: Colors.accent,
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
    fontSize: width > 600 ? 20 : 15,
    color: "#fff",
  },
  categoryItems: {
    marginLeft: 30,
    fontSize: width > 600 ? 16 : 12,
  },
  signUpWrapper: {
    paddingVertical: 15,
    maxWidth: 220,
  },
  signUp: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  signUpText: {
    fontSize: width > 600 ? 20 : 15,
    fontWeight: "bold",
    color: Colors.accent,
  },
});

export default CustomDrawer;
