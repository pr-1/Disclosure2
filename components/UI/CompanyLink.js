import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const CompanyLink = (props) => {
  console.log({ props });
  return (
    <TouchableOpacity style={styles.linkWrapper} onClick={props.onClick}>
      <View style={styles.mainInfoDisplay}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.text}>Offer: {props.offer}</Text>
          <Text style={styles.text}>Valid Until: {props.validDate}</Text>
          <Text style={styles.text}>
            <Entypo name="location-pin" size={18} color={Colors.accent} />
            {props.town} {props.distance} miles
          </Text>
        </View>
      </View>
      <View style={styles.logoContainer}>
        <Image style={styles.imageThumbnail} source={{ uri: props.logoUrl }} />
      </View>
      {props.discountAvailable && (
        <View style={styles.iconContainer}>
          <Image
            style={styles.iconThumbnail}
            source={require("../../assets/icons/all.png")}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

// offer = "10% off";
// vaildDate = "December 2023";
// town = "Milton Keynes";
// distance = "23.5";
// logoUrl =
//   "https://disclosureapp.s3.eu-west-2.amazonaws.com/disclosure/offers_images/0fd761c1e298e1c89eb0730a3d6bf8a4.jpeg";
// discountAvailable = "true";

const styles = StyleSheet.create({
  linkWrapper: {
    position: "relative",
    width: "90%",
    maxWidth: 400,
    height: 80,
    justifyContent: "center",
    alignItems: "flex-end",
    marginVertical: 20,
  },
  mainInfoDisplay: {
    width: "90%",
    height: "100%",
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 40,
    alignItems: "center",
  },
  textContainer: {
    height: "100%",
    width: "70%",
    paddingVertical: 8,
  },
  name: {
    fontFamily: "Kollektif",
    fontSize: 18,
    color: "#555",
    paddingBottom: 5,
  },
  text: {
    fontFamily: "Kollektif",
    fontSize: 12,
    color: "#333",
  },
  location: {
    fontFamily: "Kollektif",
    fontSize: 18,
    color: "#555",
  },
  logoContainer: {
    position: "absolute",
    left: 8,
    top: 5,
    height: 70,
    width: 70,
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 40,
  },
  imageThumbnail: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  iconContainer: {
    position: "absolute",
    right: 0,
    top: -15,
    height: 40,
    width: 40,
    borderWidth: 1,
    borderColor: Colors.accent,
    borderRadius: 20,
  },
  iconThumbnail: {
    height: 35,
    width: 35,
    borderRadius: 20,
  },
});

export default CompanyLink;
