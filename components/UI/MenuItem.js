import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import * as Linking from "expo-linking";

const MenuItem = (props) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          props.external
            ? Linking.openURL(props.target)
            : props.navigation.navigate(props.target, { cat: props.cat });
        }}
        style={{ ...styles.bottomButtonsWrapper, ...props.wrapperStyle }}
      >
        <View style={{ ...styles.bottomButton, ...props.buttonStyle }}>
          <Text style={{ ...styles.bottomButtonText, ...props.labelStyle }}>
            {props.name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#efefef",
    marginBottom: 5,
  },
  buttonLabel: {
    color: Colors.primary,
    // fontFamily: 'open-sans-bold',
    paddingVertical: 12,
    paddingLeft: 18,
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
  bottomButtonsWrapper: {
    paddingVertical: 12,
  },
});

export default MenuItem;
