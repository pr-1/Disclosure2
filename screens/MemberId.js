import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  FlatList,
  ImageBackground,
  Animated,
  Button,
} from "react-native";
import { useSelector } from "react-redux";
import CompanyLink from "../components/UI/CompanyLink";
import Colors from "../constants/Colors";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

console.log({ height }, { width });

const MemberId = (props) => {
  const offers = useSelector((state) => state.magazine.newOffers);
  const user = useSelector((state) => state.auth);
  const anim = useRef(new Animated.Value(width * 0.29)).current;

  const year = user?.createdOn?.substring(0, 4);
  const month = user?.createdOn?.substring(5, 7);
  const day = user?.createdOn?.substring(8, 10);
  const date = day + "/" + month + "/" + year;

  const length = 8 - user?.userId?.length;

  const memberNumber = "0".repeat(length) + user.userId;

  const moveUp = () => {
    Animated.timing(anim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    moveUp();
  }, []);

  const selectItemHandler = (item) => {
    props.navigation.navigate("CompanyDetails", {
      company: item,
    });
  };

  const renderHeader = () => (
    <>
      <View style={styles.cardContainer}>
        <Animated.View style={[styles.goldCardContainer, { top: anim }]}>
          <ImageBackground
            source={require("./../assets/icons/card.png")}
            resizeMode="contain"
            resizeMethod="resize"
            style={styles.imageGoldCard}
          >
            <View style={styles.goldCardTextContainer}>
              <Text style={styles.goldCardText}>{user.fname}</Text>
              <Text style={styles.goldCardText}>{user.lname}</Text>
              <Text style={styles.goldCardTextMember}>{memberNumber}</Text>
              <Text style={styles.goldCardTextDate}>{date}</Text>
            </View>
          </ImageBackground>
        </Animated.View>
        <View style={styles.blackCardContainer}>
          <View style={styles.innerBlackCardContainer}>
            <Text style={styles.mainText}>
              Disclosure<Text style={styles.stop}>.</Text>
            </Text>
            <Text style={styles.bottomText}>DISCOUNTS</Text>
          </View>
        </View>
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>New Offers</Text>
      </View>
    </>
  );
  const renderEmpty = () => (
    <View style={styles.emptyTextContainer}>
      <Text style={styles.emptyText}>
        No companies available to display currently
      </Text>
    </View>
  );

  return (
    <View style={styles.center}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Member ID</Text>
      </View>
      {/* <View style={styles.cardContainer}>
        <View style={styles.goldCardContainer}>
          <ImageBackground
            source={require("./../assets/icons/card.png")}
            resizeMode="contain"
            resizeMethod="resize"
            style={styles.imageGoldCard}
          >
            <View style={styles.goldCardTextContainer}>
              <Text style={styles.goldCardText}>{user.fname}</Text>
              <Text style={styles.goldCardText}>{user.lname}</Text>
              <Text style={styles.goldCardTextMember}>{memberNumber}</Text>
              <Text style={styles.goldCardTextDate}>{date}</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.blackCardContainer}>
          <View style={styles.innerBlackCardContainer}>
            <Text style={styles.mainText}>
              Disclosure<Text style={styles.stop}>.</Text>
            </Text>
            <Text style={styles.bottomText}>DISCOUNTS</Text>
          </View>
        </View>
      </View> */}
      <View style={styles.offersContainer}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
          data={offers}
          renderItem={({ item }) => (
            <CompanyLink
              name={item.name}
              offer={item.offer}
              end={item.end}
              town={item.town}
              distance={item.distance}
              logoUrl={item.imageUrl}
              discountAvailable={item.discountCode ? true : false}
              onSelect={() => {
                selectItemHandler(item);
              }}
            />
          )}
          ListHeaderComponent={renderHeader}
          // ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          // onEndReachedThreshold={0.2}
          // onEndReached={fetchMoreData}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  titleText: {
    fontSize: width > 600 ? 38 : 22,
    fontFamily: "Kollektif",
  },
  cardContainer: {
    flex: 10,
    alignItems: "center",
    overflow: "hidden",
  },
  offersContainer: {
    flex: 10,
    overflow: "hidden",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: width > 600 ? 30 : 10,
  },
  headerText: {
    fontSize: width > 600 ? 38 : 22,
    fontFamily: "Kollektif",
  },
  goldCardContainer: {
    top: width * 0.29,
  },
  imageGoldCard: {
    width: width * 0.71,
    height: width * 0.45,
  },
  goldCardTextContainer: {
    alignSelf: "center",
    marginLeft: width * 0.08,
    paddingTop: width * 0.08,
  },
  goldCardText: {
    fontSize: width * 0.041,
  },
  goldCardTextMember: {
    fontSize: width * 0.027,
    paddingTop: 10,
  },
  goldCardTextDate: {
    fontSize: width * 0.03,
    paddingTop: width * 0.085,
  },
  blackCardContainer: {
    backgroundColor: "black",
    width: width * 0.78,
    borderRadius: width * 0.036,
    alignItems: "center",
    paddingVertical: width * 0.07,

    top: -width * 0.04,
  },
  innerBlackCardContainer: {
    borderColor: Colors.accent,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: width * 0.036,
    alignItems: "center",
    paddingHorizontal: width * 0.07,
    paddingVertical: width * 0.02,
  },
  mainText: {
    color: "white",
    fontSize: width * 0.086,
    fontFamily: "YesevaOne",
  },
  stop: {
    color: Colors.accent,
  },
  bottomText: {
    color: "white",
    fontSize: width * 0.043,
    fontFamily: "YesevaOne",
  },
});

export default MemberId;
