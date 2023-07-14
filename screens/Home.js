// ./screens/Home.js

import React, { useEffect, useState, useRef, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Animated,
  Button,
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

import { AuthContext } from "../components/context";
import SearchBar from "../components/UI/SearchBar";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const Home = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideIndexRef = useRef();
  const dispatch = useDispatch();

  const {
    search,
    toggleSearch,
    setPageOrigin,
    addPageToStack,
    removePageFromStack,
  } = useContext(AuthContext);
  const advertisingSpace = useSelector(
    (state) => state.magazine.featuredCompanies
  );
  const user = useSelector((state) => state.auth);
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
    if (search) {
      toggleSearch();
    }
  }, []);

  useEffect(() => {
    dispatch(productsActions.clearProducts());
  }, []);

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

  useEffect(() => {
    if (user?.expires) {
      RootNavigation.navigate("ResetPassword");
    }
  }, [user]);

  const renderOffer = (item) => {
    return (
      <View style={styles.newOfferContainer}>
        <TouchableOpacity
          onPress={() => {
            clearInterval();
            setPageOrigin("Home");
            RootNavigation.navigate("CompanyDetails", {
              company: item.item,
            });
          }}
        >
          <Image
            source={{ uri: item.item.mainImage }}
            resizeMode="cover"
            resizeMethod="resize"
            style={styles.newOfferImage}
          />
          <View style={styles.newOfferTextContainer}>
            <Text style={styles.newOfferText}>!NEW OFFER!</Text>
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
      <View style={styles.scrollView}>
        <View style={styles.container}>
          {search ? (
            <SearchBar
              pageName="home"
              displayInModal={true}
              navigation={navigation}
              category=""
            />
          ) : null}

          <View style={styles.blockContainer}>
            {/* ************* Categories Directory Block ************* */}

            <View style={styles.innerContainer}>
              <TouchableOpacity
                style={styles.linksDirectoryWrapper}
                onPress={() => {
                  clearInterval();
                  addPageToStack("Home");
                  RootNavigation.navigate("Categories");
                }}
              >
                <View style={styles.centre}>
                  <Image
                    source={require("./../assets/icons/Directory.png")}
                    style={styles.categoriesImage}
                    resizeMode="cover"
                    resizeMethod="resize"
                  />

                  <View style={styles.categoriesTextContainer}>
                    <Text style={styles.categoriesText}>Local</Text>
                    <Text style={styles.categoriesText}>Business</Text>
                    <Text style={styles.categoriesTextSmall}>Directory</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            {/* *************All Discounts Block ************************* */}

            <View style={styles.innerContainer}>
              <TouchableOpacity
                style={styles.linksDirectoryWrapper}
                onPress={() => {
                  addPageToStack("Home");
                  RootNavigation.navigate("category", { cat: "all" });
                }}
              >
                <View style={styles.centre}>
                  <Image
                    source={require("./../assets/discountbackground.jpg")}
                    style={styles.magazineImage}
                    resizeMode="cover"
                    resizeMethod="resize"
                  />
                  <View style={styles.discountImageContainer}>
                    <Image
                      source={require("./../assets/ddblack.jpg")}
                      style={styles.discountImage}
                      resizeMode="contain"
                      resizeMethod="auto"
                    />
                    <View style={styles.discountTextContainer}>
                      <Text style={styles.magazineText}>Discounts</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            {/* ************* Magazine Block ************************* */}

            <View style={styles.innerContainer}>
              <TouchableOpacity
                style={styles.linksDirectoryWrapper}
                onPress={() => {
                  addPageToStack("Home");
                  RootNavigation.navigate("Magazine");
                }}
              >
                <View style={styles.centre}>
                  <Image
                    source={require("./../assets/magazineHeader.jpg")}
                    style={styles.magazineImage}
                    resizeMode="cover"
                    resizeMethod="resize"
                  />
                  <View style={styles.magazineTextContainer}>
                    <Text style={styles.magazineText}>Magazine</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            {/* ************* Blog Block ************************* */}

            <View style={styles.innerContainer}>
              <TouchableOpacity
                style={styles.linksDirectoryWrapper}
                onPress={() => {
                  Linking.openURL("https://thedisclosurehub.co.uk/blog");
                }}
              >
                <View style={styles.centre}>
                  <Image
                    source={require("./../assets/blogHeader.jpg")}
                    style={styles.magazineImage}
                    resizeMode="cover"
                    resizeMethod="resize"
                  />
                  <View style={styles.magazineTextContainer}>
                    <Text style={styles.magazineText}>Blogs</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    height: height,
    alignItems: "center",
  },

  scrollView: {
    width: "100%",
  },

  headerContainer: {
    width: "100%",
  },
  headerText: {
    fontSize: 30,
  },
  headerStop: {
    fontSize: 30,
    color: Colors.accent,
  },

  blockContainer: {
    display: "flex",
    height: "100%",
    width: "100%",
  },

  centre: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  scrollContainer: {
    flexDirection: "row",
    height: (height - 100) / 4,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "row",
    height: (height - 170) / 4,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
  },
  linksDirectoryWrapper: {
    height: "100%",
    width: "100%",
  },
  newOfferContainer: {
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  newOfferImage: {
    height: "100%", //width > 600 ? 250 : 150,
    width: width,
  },
  newOfferTextContainer: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "white",
    opacity: 0.9,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginTop: 50,
  },
  newOfferText: {
    fontSize: 20,
    fontFamily: "Kollektif_Bold",
  },
  newOfferTextOffer: {
    fontSize: 20,
    fontFamily: "Kollektif",
  },
  magazineContainer: {
    height: 250,
    width: "100%",
  },
  magazineImage: {
    maxWidth: "100%",
    width: "100%",
    height: (height - 100) / 4,
  },
  categoriesImage: {
    maxWidth: "100%",
    maxHeight: (height - 100) / 4,
    opacity: 0.2,
  },
  discountImageContainer: {
    width: "45%",
    position: "absolute",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  discountImage: {
    width: "100%",
    height: "45%",
    // height: ((height - 100) / 4) * 0.7,
    // marginBottom: -20,
  },
  discountTextContainer: {
    backgroundColor: "rgba(255,255,255,0.5)",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  categoriesTextContainer: {
    position: "absolute",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesText: {
    fontSize: 35,
    fontFamily: "Kollektif_Bold",
  },
  categoriesTextSmall: {
    fontSize: 20,
    fontFamily: "Kollektif",
    marginTop: 10,
  },
  magazineTextContainer: {
    backgroundColor: "rgba(255,255,255,0.5)",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    position: "absolute",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderwidth: 1,
    borderColor: "red",
  },
  blogTextContainer: {
    // position: "absolute",
    backgroundColor: "rgba(255,255,255,0.5)",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // left: width / 2 - 43,
    // top: 100,
  },
  magazineText: {
    fontSize: 20,
  },
  magazineHeaderTextContainer: {
    // position: "absolute",
    // top: 20,
    // left: 10,
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
