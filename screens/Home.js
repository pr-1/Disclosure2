// ./screens/Home.js

import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Animated,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as RootNavigation from "../navigation/RootNavigation";

import * as productsActions from "../store/actions/products";
import * as magazineActions from "../store/actions/magazine";
import * as auth from "../store/actions/auth";
import * as location from "../store/actions/location";
import * as Linking from "expo-linking";
import Colors from "../constants/Colors";

const width = Dimensions.get("screen").width;
const DOT_SIZE = 8;
const DOT_SPACING = 8;
const DOT_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING;

const Home = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideIndexRef = useRef();
  const dispatch = useDispatch();

  const advertisingSpace = useSelector(
    (state) => state.magazine.featuredCompanies
  );
  const magazineUrl = useSelector((state) => state?.magazine?.magazine);
  const offers = useSelector((state) => state.magazine.newOffers);

  const [featured, setFeatured] = useState();
  const [date, setDate] = useState("");
  const [dataList, setDataList] = useState(offers);

  useEffect(() => {
    setDataList(offers);

    let scrollIndex = 0;

    const interval = setInterval(() => {
      scrollIndex++;
      if (scrollIndex >= dataList.length) {
        scrollIndex = 0;
      }
      if (slideIndexRef.current) {
        slideIndexRef.current.scrollToIndex({ index: scrollIndex });
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    if (advertisingSpace) {
      const index = Math.floor(Math.random() * advertisingSpace.length);
      setFeatured(advertisingSpace[index]);
    }
  }, [advertisingSpace]);

  useEffect(() => {
    if (magazineUrl.length > 0) {
      const year = magazineUrl[0].date.substring(0, 4);
      const month = magazineUrl[0].date.substring(5, 7);
      const day = magazineUrl[0].date.substring(8, 10);
      setDate(day + "/" + month + "/" + year);
    }
  }, [magazineUrl]);

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log({ e });
      }

      dispatch(auth.reRegister(JSON.parse(userToken)));
      dispatch(magazineActions.getInitial());
      dispatch(productsActions.fetchCategories());
      dispatch(location.getLocation());
    }, 1);
  }, []);

  const renderOffer = (item) => {
    return (
      <View style={styles.newOfferContainer}>
        <TouchableOpacity
          onPress={() => {
            clearInterval();
            featured
              ? RootNavigation.navigate("CompanyDetails", {
                  company: item.item,
                })
              : null;
          }}
        >
          <Image
            source={{ uri: item.item.imageUrl }}
            resizeMode="cover"
            resizeMethod="resize"
            style={styles.newOfferImage}
          />
          <View style={styles.newOfferTextContainer}>
            <Text style={styles.newOfferText}>!NEW!</Text>
            <Text style={styles.newOfferTextOffer}>
              Offer: {item.item.directoryTitle}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  if (offers && offers.length > 0) {
    return (
      <SafeAreaView style={styles.center}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          style={styles.scrollView}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>DISCLOSURE HUB</Text>
            <Text style={styles.headerStop}>.</Text>
          </View>

          <Animated.FlatList
            ref={slideIndexRef}
            horizontal
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            legacyImplementation={false}
            snapToInterval={width}
            decelerationRate="fast"
            bounces={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            data={offers}
            renderItem={(item) => renderOffer(item)}
            keyExtractor={(_, index) => index.toString()}
            style={{ width: width, height: "100%" }}
            onScrollToIndexFailed={(info) => {
              const wait = new Promise((resolve) => setTimeout(resolve, 500));
              wait.then(() => {
                flatList.current?.scrollToIndex({
                  index: info.index,
                  animated: true,
                });
              });
            }}
          />
          <View style={styles.pagination}>
            {offers.map((_, index) => {
              return <View key={index} style={[styles.dot]}></View>;
            })}
            <Animated.View
              style={[
                styles.dotIndicator,
                {
                  transform: [
                    {
                      translateX: Animated.divide(scrollX, width).interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, DOT_INDICATOR_SIZE],
                      }),
                    },
                  ],
                },
              ]}
            />
          </View>

          <View style={styles.featuredContainer}>
            <View style={styles.advertisingContainer}>
              <TouchableOpacity
                onPress={() => {
                  clearInterval();
                  featured
                    ? RootNavigation.navigate("CompanyDetails", {
                        company: featured,
                      })
                    : null;
                }}
              >
                <Image
                  source={
                    featured?.backgroundImage
                      ? { uri: featured.backgroundImage }
                      : require("./../assets/icons/tmp/advertising.png")
                  }
                  style={styles.advertisingImage}
                />
                <View style={styles.advertisingWrapper}>
                  <View style={styles.advertisingLogoContainer}>
                    <Image
                      source={
                        featured?.logo
                          ? { uri: featured.logo }
                          : require("./../assets/icons/tmp/advertisingLogo.png")
                      }
                      style={styles.advertisinglogo}
                    />
                  </View>
                  <View style={styles.advertisingTextContainer}>
                    <Text style={styles.advertisingText}>
                      {featured?.name ? featured.name : "Advertise Here"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.allDiscountsContainer}
              onPress={() => {
                clearInterval();
                RootNavigation.navigate("All Discounts");
              }}
            >
              <View style={styles.allDiscountsImageWrapper}>
                <Image
                  source={require("./../assets/icons/all.png")}
                  style={styles.allDiscountsImage}
                />
              </View>
              <Text style={styles.allDiscountsText}>All discounts</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.linksContainer}>
            <View style={styles.linksCategoriesContainer}>
              <TouchableOpacity
                style={styles.linksCategoriesWrapper}
                onPress={() => {
                  clearInterval();
                  RootNavigation.navigate("Categories");
                }}
              >
                <View style={styles.linksCategoriesImageWrapper}>
                  <Image
                    source={require("./../assets/icons/categorypic.jpg")}
                    style={styles.linksCategoriesImage}
                  />
                </View>
                <View style={styles.linksCategoriesTextContainer}>
                  <Text style={styles.linksCategoriesText}>Categories</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.linksDirectoryContainer}>
              <TouchableOpacity
                style={styles.linksDirectoryWrapper}
                onPress={() => {
                  clearInterval();
                  RootNavigation.navigate("Directory");
                }}
              >
                <View style={styles.linksDirectoryImageWrapper}>
                  <Image
                    source={require("./../assets/icons/Directory.png")}
                    style={styles.linksDirectoryImage}
                  />
                </View>
                <View style={styles.linksDirectoryLogoContainer}>
                  <View>
                    <Text style={styles.linksDirectoryLogoText}>A-Z</Text>
                  </View>
                  <View style={styles.linksDirectoryTextContainer}>
                    <Text style={styles.linksDirectoryText}>Directory</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.magazineContainer}>
            <TouchableOpacity
              style={styles.linksDirectoryWrapper}
              onPress={() => {
                clearInterval();
                magazineUrl?.length > 0
                  ? Linking.openURL(magazineUrl[0].url)
                  : null;
              }}
            >
              <Image
                source={require("./../assets/icons/tmp/magazineHeader.png")}
                style={styles.magazineImage}
                resizeMode="cover"
                resizeMethod="resize"
              />
              <View style={styles.magazineHeaderTextContainer}>
                <View style={styles.magazineHeaderTextWrapper}>
                  <View>
                    <Text style={styles.magazineHeaderText}>
                      {magazineUrl[0]?.town
                        ? magazineUrl[0].town
                        : "Milton Keynes"}
                    </Text>
                    <Text style={styles.magazineHeaderText}>
                      Issue {magazineUrl[0]?.issue}
                    </Text>
                  </View>

                  <Text style={styles.magazineHeaderText}>{date}</Text>
                </View>
              </View>
              <View style={styles.magzineTextContainer}>
                <Text style={styles.magazineText}>Magazine</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
  },
  scrollView: {
    width: "100%",
  },

  scrollViewContainer: {
    // alignItems: "center",
    // alignSelf: "center",
    // width: "100%",
  },
  pagination: {
    position: "absolute",
    top: width > 600 ? 300 : 200,
    left: width / 2 - 40,
    flexDirection: "row",
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE,
    backgroundColor: "#333",
    marginRight: DOT_SPACING,
  },
  dotIndicator: {
    width: DOT_INDICATOR_SIZE,
    height: DOT_INDICATOR_SIZE,
    borderRadius: DOT_INDICATOR_SIZE,
    borderWidth: 1,
    borderColor: "#333",
    position: "absolute",
    top: -DOT_SIZE / 2,
    left: -DOT_SIZE / 2,
  },

  headerContainer: {
    width: "100%",
    // alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 30,
  },
  headerStop: {
    fontSize: 30,
    color: Colors.accent,
  },
  newOfferContainer: {
    width: width,
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  newOfferImage: {
    height: width > 600 ? 250 : 150,
    width: width,
  },
  newOfferTextContainer: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "white",
    opacity: 0.8,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginTop: 50,
  },
  newOfferText: {
    fontSize: 20,
    fontFamily: "Kollektif",
  },
  newOfferTextOffer: {
    fontSize: 20,
    fontFamily: "Kollektif_Bold",
  },
  featuredContainer: {
    flexDirection: "row",
    height: width > 600 ? 250 : 180,
  },
  advertisingContainer: {
    flex: 3,
  },
  allDiscountsContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  allDiscountsImage: {
    height: 100,
    width: 100,
  },
  allDiscountsImageWrapper: {
    height: 110,
    width: 110,
    borderRadius: 55,
    borderWidth: 1,
    borderColor: Colors.accent,
    overflow: "hidden",
    marginBottom: 10,
  },
  allDiscountsText: {
    fontSize: width > 600 ? 25 : 16,
  },
  advertisingImage: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  advertisingWrapper: {
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  advertisingLogoContainer: {
    height: width > 600 ? 125 : 75,
    width: width > 600 ? 125 : 75,
    backgroundColor: "white",
    padding: 5,
  },
  advertisinglogo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  advertisingTextContainer: {
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  advertisingText: {
    color: "white",
    fontSize: 20,
  },
  linksContainer: {
    flexDirection: "row",
    height: width > 600 ? 250 : 180,
  },
  linksCategoriesContainer: {
    backgroundColor: "white",
    flex: 2,
  },
  linksDirectoryContainer: {
    flex: 3,
  },
  linksCategoriesWrapper: {
    alignItems: "center",
    justiftContent: "center",
  },
  linksCategoriesImageWrapper: {
    width: "100%",
    alignItems: "center",
  },
  linksCategoriesImage: {
    height: "90%",
    width: "90%",
    resizeMode: "contain",
  },
  linksCategoriesTextContainer: {
    marginTop: -10,
    marginBottom: -10,
  },
  linksCategoriesText: {
    fontSize: width > 600 ? 25 : 18,
  },

  linksDirectoryWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  linksDirectoryImageWrapper: {
    width: "100%",
    alignItems: "center",
  },
  linksDirectoryImage: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  linksDirectoryLogoContainer: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.5)",
    width: "100%",
    height: "100%",
    paddingVertical: 20,
  },
  linksDirectoryTextContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  linksDirectoryLogoText: {
    marginTop: width > 600 ? 50 : 0,
    fontSize: 50,
    color: Colors.accent,
    marginBottom: 50,
    alignSelf: "center",
  },

  linksDirectoryText: {
    fontSize: width > 600 ? 25 : 18,
    alignSelf: "center",
  },

  magazineContainer: {
    height: 250,
    width: "100%",
  },
  magazineImage: {
    width: "250%",
    height: "100%",
  },
  magzineTextContainer: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.5)",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  magazineText: {
    fontSize: 20,
  },
  magazineHeaderTextContainer: {
    position: "absolute",
    top: 20,
    left: 10,
    width: "100%",
  },
  magazineHeaderTextWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
  },
  magazineHeaderText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Kollektif",
  },
});

export default Home;
