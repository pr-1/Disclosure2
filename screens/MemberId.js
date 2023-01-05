import React from "react";
import { View, StyleSheet, Text, Dimensions, FlatList } from "react-native";
import { useSelector } from "react-redux";
import CompanyLink from "../components/UI/CompanyLink";

const width = Dimensions.get("screen").width;

const MemberId = (props) => {
  const offers = useSelector((state) => state.magazine.newOffers);

  const selectItemHandler = (item) => {
    props.navigation.navigate("CompanyDetails", {
      company: item,
    });
  };
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>New Offers</Text>
    </View>
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
      <View style={styles.cardContainer}></View>
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
    backgroundColor: "red",
    flex: 5,
  },
  offersContainer: {
    flex: 5,
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
});

export default MemberId;
