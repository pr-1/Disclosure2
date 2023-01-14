import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  Dimensions,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as productsActions from "../../store/actions/products";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import CompanyLink from "./CompanyLink";
import { AuthContext } from "../context";

const { width, height } = Dimensions.get("screen");

const SearchBar = ({ displayInModal, navigation, category }) => {
  const [page, setPage] = useState(1);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const { setSearch } = useContext(AuthContext);
  const user = useSelector((state) => state.auth);
  const products = useSelector((state) => state.products.searchResults);
  const maxCount = useSelector((state) => state.products.count);

  const [data, setData] = useState({
    searchTerm: "",
    searchTermValid: "",
  });

  useEffect(() => {
    if (!data?.searchTerm && !data.searchTermValid) {
      dispatch(productsActions.clearSearchResults());
    }
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured", error, [{ text: "Ok" }]);
    }
  }, [error]);

  useEffect(() => {
    if (user?.token && data?.searchTermValid) {
      if (page === 1) {
        fetchProducts(true);
      } else {
        fetchProducts(false);
      }
    }
  }, [user, page, maxCount, data]);

  const fetchMoreData = () => {
    if (maxCount > products.length) {
      setPage(page + 1);
    }
  };

  const textInputChange = (val) => {
    if (val.length >= 3) {
      setData({
        ...data,
        searchTerm: val,
        searchTermValid: true,
      });
    } else {
      setData({
        ...data,
        searchTerm: val,
        searchTermValid: false,
      });
      if (products?.length > 0) {
        dispatch(productsActions.clearSearchResults());
      }
    }
  };

  const fetchProducts = (clear) => {
    try {
      dispatch(
        productsActions.fetchProducts(
          "", //Long
          "", //Lat
          "", //Filter
          "", //Filter Value
          data.searchTerm, //Search Value
          page,
          category, //Category
          user.token,
          clear,
          true // Search flag
        )
      );
    } catch (err) {
      setError(err);
    }
  };

  const selectItemHandler = (item) => {
    console.log({ item });
    navigation.navigate("CompanyDetails", {
      company: item,
    });
  };

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      <View style={styles.footerLine}></View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyTextContainer}>
      <Text style={styles.emptyText}>
        No companies available to display currently
      </Text>
    </View>
  );
  if (!products) {
    return (
      <View>
        <Text>Loading, please wait </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <View style={styles.action}>
          <Ionicons
            name="search"
            size={width > 600 ? 30 : 25}
            color={"white"}
          />
          <TextInput
            placeholder="Enter Text Here"
            placeholderTextColor="#fff"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            value={data.searchTerm}
          />
        </View>
      </View>
      {displayInModal && products?.length > 0 ? (
        <View style={styles.dropdownContainer}>
          <FlatList
            // contentContainerStyle={{ flexGrow: 0, paddingBottom: 100 }}
            data={products}
            renderItem={({ item }) => (
              <CompanyLink
                name={item.name}
                offer={item.directoryTitle}
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
            // ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty}
            onEndReachedThreshold={0.2}
            onEndReached={fetchMoreData}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    alignItems: "center",
    height: 100,
    zIndex: 1,
    elevation: 2,
    flex: 1,
    height: "100%",
  },
  inputWrapper: {
    width: "99%",
    backgroundColor: "#555",
    borderColor: "black",
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderRadius: 40,
    marginTop: width > 600 ? 20 : 16,
    paddingVertical: width > 600 ? 10 : 5,
    paddingHorizontal: 20,
  },
  textInput: {
    flex: 1,
    fontSize: width > 600 ? 20 : 16,
    paddingLeft: 10,
    color: "white",
    paddingLeft: 20,
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  dropdownContainer: {
    backgroundColor: "white",
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: Colors.accent,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    width: "90%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    // alignItems: "center",
    maxHeight: "50%",
  },
});

export default SearchBar;
