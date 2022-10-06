import React from "react";
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

const CustomDrawer = (props) => {
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
          <DrawerItemList {...props} />
        </View>
        <View style={styles.bottomSection}>
          <TouchableOpacity
            onPress={() => {
              console.log("Profile Page");
            }}
            style={styles.bottomButtonsWrapper}
          >
            <View style={styles.bottomButton}>
              <Text style={styles.bottomButtonText}>Profile Settings</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log("Sign Out");
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
});

export default CustomDrawer;
