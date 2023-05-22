import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const width = Dimensions.get("screen").width;

const CompanyLink = (props) => {
  const year = props.end.substring(0, 4);
  const month = props.end.substring(5, 7);
  const day = props.end.substring(8, 10);
  const date = day + "/" + month + "/" + year;

  const length = width > 600 ? 40 : 18;
  const namelength = width > 600 ? 45 : 24;

  const town =
    props.town.length > length
      ? props.town.substring(0, length - 3) + "..."
      : props.town;

  const name =
    props.name.length > namelength
      ? props.name.substring(0, namelength - 3) + "..."
      : props.name;

  return (
    <TouchableOpacity
      style={styles.linkWrapper}
      onPress={props.onSelect}
      useForeground
    >
      <View style={styles.mainInfoDisplay}>
        <View style={styles.textContainer}>
          <View style={styles.textwrapper}>
            <Text style={styles.name} numberOfLines={1}>
              {name}
            </Text>
          </View>

          <Text style={styles.text}>Offer: {props.offer}</Text>
          <Text style={styles.text}>Valid Until: {date}</Text>
          <Text style={styles.text}>
            <Entypo name="location-pin" size={18} color={Colors.accent} />
            {town}
            {props.distance
              ? ", " + parseFloat(props.distance).toFixed(2) + " miles"
              : "."}
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

const styles = StyleSheet.create({
  linkWrapper: {
    position: "relative",
    width: "80%",
    height: width > 600 ? 130 : 80,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 20,
  },
  mainInfoDisplay: {
    width: width > 600 ? "90%" : "90%",
    height: "100%",
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: width > 600 ? 800 : 40,
    alignItems: "center",
    marginLeft: 45,
  },
  textContainer: {
    height: "100%",
    width: "70%",
    paddingVertical: width > 600 ? 8 : 5,
    paddingHorizontal: 2,
  },
  textwrapper: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    // display: "block",
    width: "100%",
    minWidth: 1,
  },
  name: {
    fontFamily: "Kollektif",
    fontSize: width > 600 ? 23 : 16,
    color: "#555",
    paddingBottom: width > 600 ? 10 : 2,
  },
  text: {
    fontFamily: "Kollektif",
    fontSize: width > 600 ? 16 : 12,
    color: "#333",
    paddingBottom: width > 600 ? 8 : 0,
  },
  location: {
    fontFamily: "Kollektif",
    fontSize: width > 600 ? 16 : 12,
    color: "#555",
  },
  logoContainer: {
    position: "absolute",
    left: 0,
    top: width > 600 ? 10 : 5,
    height: width > 600 ? 120 : 70,
    width: width > 600 ? 120 : 70,
    borderRadius: width > 600 ? 70 : 40,
  },
  imageThumbnail: {
    height: width > 600 ? 110 : 70,
    width: width > 600 ? 110 : 70,
    borderRadius: width > 600 ? 70 : 35,
    borderWidth: 1,
    borderColor: "#888",
  },
  iconContainer: {
    position: "absolute",
    right: width > 600 ? 10 : 0,
    top: -15,
    height: width > 600 ? 60 : 40,
    width: width > 600 ? 60 : 40,
    borderWidth: 1,
    borderColor: Colors.accent,
    borderRadius: width > 600 ? 30 : 20,
  },
  iconThumbnail: {
    height: width > 600 ? 50 : 35,
    width: width > 600 ? 50 : 35,
    borderRadius: width > 600 ? 15 : 10,
  },
  distanceWrapper: {
    flexDirection: "row",
    alignContent: "center",
    flexWrap: "wrap",
  },
});

export default CompanyLink;
