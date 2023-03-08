import React, { useState } from "react";
import PDFReader from "@hashiprobr/expo-pdf-reader";
import { View, Text, SafeAreaView, StyleSheet, Platform } from "react-native";
import { useSelector } from "react-redux";

const Magazine = (props) => {
  const [error, setError] = useState(undefined);

  const uri = useSelector((state) => state.magazine.magazine[0].url);
  // const uri =
  //   "http://18.135.69.3/api/assets/disclosureimages/1aca0462bf9b1f38357447836849e5d7.pdf";

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 15,
        }}
      >
        <Text style={{ color: "red", textAlign: "center" }}>
          {error.toString()}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PDFReader
        source={{ uri }}
        // onLoadComplete={(numberOfPages, filePath) => {
        //   console.log(`Number of pages: ${numberOfPages}`);
        // }}
        // onPageChanged={(page, filePath) => {
        //   console.log(`Current page: ${page}`);
        // }}
        // onPressLink={(uri) => {
        //   console.log(`Link pressed: ${uri}`);
        // }}
        onError={setError}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Magazine;
