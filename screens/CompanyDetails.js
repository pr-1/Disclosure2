import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import Colors from "../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const CompanyDetails = ({ route }) => {
  const selected = route.params.company;
  const [modalVisible, setModalVisible] = useState(false);

  const copyToClipboard = () => {
    Clipboard.setStringAsync(selected.discountCode);
  };

  let cloud, code, title;

  if (selected?.instagram) {
    cloud = { type: "instagram", url: selected?.instagram };
  }
  if (selected?.twitter) {
    cloud = { type: "twitter", url: selected?.twitter };
  }
  if (selected?.facebook) {
    cloud = { type: "facebook", url: selected?.facebook };
  }
  if (selected?.website) {
    cloud = { type: "website", url: selected?.website };
  }

  const year = selected.end.substring(0, 4);
  const month = selected.end.substring(5, 7);
  const day = selected.end.substring(8, 10);
  const date = day + "/" + month + "/" + year;

  const titleLength = width > 600 ? 15 : 10;
  const codeLength = 10;

  if (selected?.directoryTitle) {
    title =
      selected?.directoryTitle.length > titleLength
        ? selected?.directoryTitle.substring(0, titleLength - 3) + "..."
        : selected?.directoryTitle;
  }

  if (selected?.discountCode) {
    code =
      selected?.discountCode.length > codeLength
        ? selected?.discountCode.substring(0, codeLength)
        : selected?.discountCode;
  }

  return (
    <View style={styles.center}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalBackgroundImageContainer}>
              <Image
                style={styles.modalBackgroundImage}
                source={require("./../assets/icons/background.jpg")}
                resizeMode="cover"
                resizeMethod="resize"
              />
            </View>
            <View style={styles.modalContainer}>
              <View style={styles.modalTitleContainer}>
                <Text style={styles.modalTitle}>Discount</Text>
                <Text style={styles.modalTitle}>Voucher</Text>
              </View>
              <View style={styles.ticket}>
                <TouchableOpacity onPress={() => copyToClipboard()}>
                  <Image
                    style={styles.ticketImage}
                    source={require("./../assets/icons/Voucher.png")}
                    resizeMode="cover"
                    resizeMethod="resize"
                  />
                  <View style={styles.ticketTextContainer}>
                    <View style={styles.offerCodeContainer}>
                      <Text style={styles.codeText}>
                        {title}
                        {" : "}
                      </Text>
                      <Text style={styles.codeText}>{code}</Text>
                    </View>
                    <View style={styles.expiryDateContainer}>
                      <Text style={styles.dateText}>Expiry date: {date}</Text>
                    </View>
                    <View style={styles.lastTextContainer}>
                      <Text style={styles.lastText}>
                        Click ticket to copy code to clipboard
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.bottomTextContainer}>
                <TouchableOpacity onPress={() => Linking.openURL(cloud?.url)}>
                  <Text style={styles.bottomText}>
                    Visit our {cloud?.type}: {cloud?.url}
                  </Text>
                </TouchableOpacity>

                <Text style={styles.bottomText}>
                  Copy and paste the code to use this voucher
                </Text>
              </View>

              {/* <Button title="View copied text" onPress={fetchCopiedText} /> */}
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <AntDesign name="closecircleo" size={width > 600 ? 30 : 25} />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.pageContainer}>
        <View style={styles.backgroundImageContainer}>
          <Image
            style={styles.backgroundImage}
            source={{
              uri: selected?.backgroundImage
                ? selected?.backgroundImage
                : selected?.bottomImage1,
            }}
            resizeMode="cover"
            resizeMethod="resize"
          />
        </View>

        {/* **********************Section Seperator******************************************* */}

        <View style={styles.container}>
          <View
            style={
              selected?.mainImage
                ? styles.logoContainer
                : styles.noLogoContainer
            }
          >
            <Image
              style={styles.logo}
              source={
                selected?.mainImage
                  ? { uri: selected?.mainImage }
                  : require("./../assets/icons/all.png")
              }
              resizeMode="contain"
              resizeMethod="resize"
            />
          </View>

          {/* **********************Section Seperator******************************************* */}

          <View style={styles.seperator}></View>

          {/* **********************Section Seperator******************************************* */}

          <View style={styles.descriptionContainer}>
            <ScrollView>
              <View style={styles.nameTextContainer}>
                <Text style={styles.nameText}>{selected?.name}</Text>
              </View>
              <View style={styles.nameTextContainer}>
                <Text style={styles.titleText}>{selected?.title}</Text>
                <Text style={styles.titleText}>{selected?.subtitle}</Text>
              </View>
              <View style={styles.offerTextContainer}>
                <Text style={styles.nameText}>Offer Available</Text>
              </View>
              <View>
                <Text style={styles.titleText}>{selected?.description}</Text>
              </View>
            </ScrollView>
            {selected?.discountCode ? (
              <TouchableOpacity
                style={styles.discountButtonContainer}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.discountButtonText}>GET DISCOUNT</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
  },
  pageContainer: {},
  container: {
    position: "absolute",
    top: width > 600 ? 0 : -10,
    left: width > 600 ? 110 : 40,
    bottom: width > 600 ? 80 : 120,
    right: width > 600 ? 110 : 40,
    justifyContent: "space-around",
    alignItems: "center",
    textAlign: "center",
  },

  backgroundImageContainer: {},

  seperator: {
    borderBottomColor: "white",
    borderBottomWidth: 2,
    width: "100%",
  },

  logoContainer: {
    height: width > 600 ? 200 : 125,
    width: "100%",

    justifyContent: "center",
    alignItems: "center",
  },
  noLogoContainer: {
    height: width > 600 ? 200 : 125,
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    height: "90%",
    width: "90%",
  },
  descriptionContainer: {
    height: "60%",
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 30,
    alignItems: "center",
  },
  nameText: {
    fontFamily: "Kollektif_Bold",
    fontSize: width > 600 ? 25 : 20,
  },
  nameTextContainer: {
    marginBottom: 20,
  },
  titleText: {
    fontFamily: "Kollektif",
    fontSize: width > 600 ? 16 : 12,
  },
  offerTextContainer: {
    marginBottom: 10,
  },
  discountButtonContainer: {
    position: "absolute",
    bottom: width > 600 ? -30 : -35,
    paddingVertical: width > 600 ? 20 : 10,
    paddingHorizontal: width > 600 ? 25 : 15,
    borderRadius: 40,
    borderColor: Colors.accent,
    borderWidth: 4,
    backgroundColor: "white",
  },
  discountButtonText: {
    fontFamily: "Kollektif",
    fontSize: width > 600 ? 35 : 25,
  },
  centeredView: {},
  modalView: {
    marginHorizontal: width > 600 ? 80 : 35,
    backgroundColor: "white",
    borderRadius: 20,

    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width > 600 ? "80%" : " 82%",
    position: "absolute",
    top: width > 600 ? width / 2 : width / 1.5,
    height: width > 600 ? height / 1.8 : height / 2,
  },
  modalBackgroundImageContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  modalBackgroundImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    justifyContent: "space-around",
  },
  modalTitleContainer: {
    width: width > 600 ? "40%" : "60%",
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: width > 600 ? 55 : 35,

    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: width > 600 ? 20 : 8,
    marginVertical: width > 600 ? 40 : 20,
  },
  modalTitle: {
    fontFamily: "Kollektif",
    fontSize: width > 600 ? 35 : 25,
  },
  buttonClose: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  ticket: {
    width: "95%",
    height: width > 600 ? 160 : 90,
    marginTop: 30,
  },
  ticketImage: {
    height: " 100%",
    width: "100%",
  },
  ticketTextContainer: {
    position: "absolute",
    left: width > 600 ? 60 : 25,
    right: width > 600 ? 60 : 25,
    paddingTop: width > 600 ? 30 : 10,
    width: "80%",
  },
  codeText: {
    fontFamily: "Kollektif",
    fontSize: width > 600 ? 35 : 19,
    color: "white",
  },
  dateText: {
    fontFamily: "Kollektif",
    fontSize: width > 600 ? 22 : 15,
    color: "white",
  },
  offerCodeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: width > 600 ? 20 : 10,
    width: "100%",
  },
  expiryDateContainer: {
    marginBottom: width > 600 ? 18 : 8,
  },
  lastTextContainer: {},
  lastText: {
    fontFamily: "Kollektif",
    fontSize: width > 600 ? 18 : 12,
    color: "white",
  },
  bottomTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
    justifyContent: "space-between",
  },
  bottomText: {
    fontFamily: "Kollektif",
    fontSize: width > 600 ? 16 : 12,
    color: "white",
    paddingBottom: 5,
  },
});

export default CompanyDetails;
