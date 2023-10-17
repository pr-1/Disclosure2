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
  ImageBackground,
} from "react-native";
import Colors from "../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import { SocialIcon, Icon } from "react-native-elements";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const CompanyDetails = ({ route }) => {
  const handlePress = async (url) => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };
  const selected = route.params.company;
  console.log(selected);
  const [modalVisible, setModalVisible] = useState(false);

  const copyToClipboard = () => {
    Clipboard.setStringAsync(selected.discountCode);
  };

  let code, title;

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
            <View style={styles.modalContainer}>
              <ImageBackground
                resizeMode="contain"
                style={{ padding: 20 }}
                source={require("./../assets/icons/Voucher.png")}
              >
                <View style={styles.modalTitleContainer}>
                  <Text style={styles.modalTitle}>Discount</Text>
                  <Text style={styles.modalTitle}>Voucher</Text>
                </View>
              </ImageBackground>
              <View>
                <TouchableOpacity onPress={() => copyToClipboard()}>
                  <View style={styles.ticketTextContainer}>
                    <View style={styles.offerTextContainer}>
                      <Text
                        style={[
                          styles.nameText,
                          { color: "white", textAlign: "center" },
                        ]}
                      >
                        {selected.name}
                      </Text>
                    </View>
                    <View style={styles.offerCodeContainer}>
                      <Text
                        style={[
                          styles.codeText,
                          { color: "white", textAlign: "center" },
                        ]}
                      >
                        {selected.title}
                      </Text>
                    </View>

                    <View style={styles.expiryDateContainer}>
                      <Text
                        style={[
                          styles.dateText,
                          { color: "white", textAlign: "center" },
                        ]}
                      >
                        Expiry date: {date}
                      </Text>
                    </View>
                    <View style={styles.lastTextContainer}>
                      <Text
                        style={[
                          styles.lastText,
                          { color: "white", textAlign: "center" },
                        ]}
                      >
                        {selected?.subtitle}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <AntDesign
                  name="closecircleo"
                  color="white"
                  size={width > 600 ? 30 : 25}
                />
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
              <View
                style={{
                  marginBottom: 20,
                }}
              >
                <Text style={styles.titleText}>
                  {selected?.description}. {selected?.title}.{" "}
                  {selected?.subtitle}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  marginBottom: 10,
                }}
              >
                <Text style={styles.nameText}>Website</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                  onPress={() => handlePress(selected?.website)}
                >
                  <Icon name="language" iconSize={14} />
                  <Text style={styles.linkText}>
                    {selected?.website.toLowerCase()}
                  </Text>
                </View>
              </View>
              <View style={styles.nameTextContainer}>
                <Text style={styles.nameText}>Socials</Text>
              </View>
              <View style={styles.socialContainer}>
                {selected?.instagram && (
                  <View
                    
                    onPress={() => handlePress(selected?.instagram)}
                  >
                    <SocialIcon type="instagram" light raised={false} />
                    
                  </View>
                )}
                {selected?.facebook && (
                  <View
                    
                    onPress={() => handlePress(selected?.facebook)}
                  >
                    <SocialIcon type="facebook" light raised={false} />
                    
                  </View>
                )}
                {selected?.twitter && (
                  <View
                    
                    onPress={() => handlePress(selected?.twitter)}
                  >
                    <SocialIcon type="twitter" light raised={false} />
                   
                  </View>
                )}
              </View>
              {(selected?.email || selected?.phone) && (
                <View style={styles.nameTextContainer}>
                  <Text style={styles.nameText}>Contact</Text>
                </View>
              )}
              <View style={styles.socialContainer}>
                {selected?.email && (
                  <View
                    onPress={() => handlePress(`mailto:${selected.email}`)}
                  >
                    <Icon name="email" iconSize={14} />
                  </View>
                )}
                {selected?.phone && (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                    onPress={() => handlePress(`tel:${selected.phone}`)}
                  >
                    <Icon name="phone" iconSize={14} />
                    <Text style={styles.linkText}>
                      {selected?.phone.toLowerCase()}
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>
            {selected?.discountCode ? (
              <TouchableOpacity
                style={styles.discountButtonContainer}
                onPress={() => setModalVisible(true)}
              >
                {selected?.discountAvailable && (
                  <View style={[styles.nameTextContainer, { padding: 10 }]}>
                    <Text
                      style={[
                        styles.titleText,
                        { fontFamily: "Kollektif_Bold", fontSize: 20 },
                      ]}
                    >
                      Offer Available
                    </Text>
                  </View>
                )}
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
  socialContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 20,
    bottom: 10,
  },
  logo: {
    height: "90%",
    width: "90%",
  },
  descriptionContainer: {
    height: "fit-content",
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
  linkText: {
    fontFamily: "Kollektif",
    fontSize: 16,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
  nameTextContainer: {
    marginBottom: 10,
  },
  titleText: {
    fontFamily: "Kollektif",
    fontSize: width > 600 ? 16 : 12,
  },
  offerTextContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    borderColor: Colors.accent,
  },
  discountButtonContainer: {
    position: "absolute",
    bottom: width > 600 ? -30 : -35,
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
    backgroundColor: "grey",
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
    backgroundImage: "assets",
  },
  modalTitleContainer: {
    width: width > 600 ? "40%" : "60%",
    borderRadius: width > 600 ? 55 : 35,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontFamily: "Kollektif",
    fontSize: width > 600 ? 35 : 25,
    color: "white",
  },
  buttonClose: {
    position: "absolute",
    top: 10,
    right: 10,
    color: "white",
  },
  ticket: {
    width: "95%",
    marginTop: 0,
    textAlign: "center",
  },
  ticketImage: {
    height: 150,
    width: "100%",
  },
  ticketTextContainer: {
    paddingBottom: 40,
    paddingTop: 10,
    paddingHorizontal: 10,
    textAlign: "center",
    width: "100%",
  },
  codeText: {
    fontFamily: "Kollektif",
    fontSize: width > 600 ? 22 : 14,
    color: "white",
  },
  dateText: {
    fontFamily: "Kollektif",
    fontSize: width > 600 ? 22 : 15,
    color: "white",
  },
  offerCodeContainer: {
    marginBottom: width > 600 ? 20 : 10,
    width: "100%",
  },
  expiryDateContainer: {
    marginBottom: width > 600 ? 18 : 8,
  },
  lastTextContainer: {},
  lastText: {
    fontFamily: "Kollektif",
    fontSize: 16,
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
