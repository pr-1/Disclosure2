import React, { useEffect, useState, useRef, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import * as productsActions from "../store/actions/products";
import { AuthContext } from "../components/context";
import SearchBar from "../components/UI/SearchBar";
import CompanyLink from "../components/UI/CompanyLink";
import Colors from "../constants/Colors";

const width = Dimensions.get("screen").width;

function useAsyncRef(ref) {
  const value = useRef(ref);
  const [, forceRender] = useState(false);

  function updateValue(newState) {
    value.current = newState;
    forceRender((s) => !s);
  }
  return [value, updateValue];
}

const Category = (props) => {
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const products = useSelector((state) => state.products.availableProducts);
  const maxCount = useSelector((state) => state.products.count);
  const location = useSelector((state) => state.location);
  const { search, toggleSearch } = useContext(AuthContext);

  const category = useSelector((state) =>
    state.products.categories.find((cat) => cat.name === props.route.params.cat)
  );

  const [page, setPage] = useState(1);
  const [long, setLong] = useAsyncRef();
  const [lat, setLat] = useAsyncRef();
  const [name, setName] = useAsyncRef();
  const [url, setUrl] = useAsyncRef();
  const [cat, setCat] = useAsyncRef();
  const [filter, setFilter] = useAsyncRef("");

  // Handle errors arising from the api fetch
  useEffect(() => {
    if (error) {
      Alert.alert("An error occured", error, [{ text: "Ok" }]);
    }
  }, [error]);

  // If search bar is open on page mount, close search bar
  useEffect(() => {
    if (search) {
      toggleSearch();
    }
  }, []);

  useEffect(() => {
    setLong(location?.long);
    setLat(location?.lat);
    setName(category?.name);
    setCat(props.route.params.cat);
    setUrl(category?.url);

    if (props.route.params.cat === "a-z") {
      setLong(0);
      setLat(0);
      setCat("");
      setName("A-Z Directory");
      setUrl(
        "https://disclosureapp.s3.eu-west-2.amazonaws.com/disclosure/uploaded_images/all.png"
      );
    }
    if (props.route.params.cat === "all") {
      setLong(0);
      setLat(0);
      setCat("");
      setName("All Discounts");
      setUrl(
        "https://disclosureapp.s3.eu-west-2.amazonaws.com/disclosure/uploaded_images/all.png"
      );
      setFilter("discount_code");
    }
    if (props.route.params.cat === "All categories") {
      setCat("");
    }
  }, [location, category]);

  const fetchProducts = (clear) => {
    try {
      dispatch(
        productsActions.fetchProducts(
          long.current, //Long
          lat.current, //Lat
          filter.current, //Filter
          "", //Filter Value
          "", //Search Value
          page,
          cat.current, //Category
          user.token,
          clear
        )
      );
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    if (user?.token && location?.long && !search) {
      if (page === 1) {
        fetchProducts(true);
      } else {
        fetchProducts(false);
      }
    }
  }, [user, page, maxCount, location, search]);

  const fetchMoreData = () => {
    if (maxCount > products.length) {
      setPage(page + 1);
    }
  };

  const selectItemHandler = (item) => {
    props.navigation.navigate("CompanyDetails", {
      company: item,
    });
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.headerImageContainer}>
        <Image style={styles.imageThumbnail} source={{ uri: url.current }} />
      </View>
      <Text style={styles.headerText}>{name.current}</Text>
    </View>
  );

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
    <View style={styles.center}>
      {search ? (
        <SearchBar
          pageName="category"
          displayInModal={true}
          navigation={props.navigation}
          category={cat.current}
        />
      ) : null}
      <FlatList
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
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
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        onEndReachedThreshold={0.2}
        onEndReached={fetchMoreData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: width > 600 ? 30 : 10,
  },
  headerImageContainer: {},
  imageThumbnail: {
    width: width > 600 ? 200 : 100,
    height: width > 600 ? 200 : 100,
  },
  headerText: {
    fontSize: width > 600 ? 38 : 22,
    fontFamily: "Kollektif",
  },
  footerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: width > 600 ? 30 : 10,
  },
  footerLine: {
    width: "80%",
    borderBottomWidth: 2,
    borderColor: Colors.accent,
  },
  emptyTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: width > 600 ? 20 : 14,
    fontFamily: "Kollektif",
  },
});

export default Category;
