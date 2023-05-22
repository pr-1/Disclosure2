import React, { useEffect, useMemo, useReducer } from "react";
import { StatusBar } from "expo-status-bar";

import { Provider, useSelector, connect } from "react-redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { AuthContext } from "./components/context";

import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./navigation/RootNavigation";
import ShopTabNavigator from "./navigation/ShopTabNavigator";
import { AuthStackNavigator } from "./navigation/StackNavigator";

import authReducer from "./store/reducers/auth";
import productsReducer from "./store/reducers/products";
import locationReducer from "./store/reducers/location";
import magazineReducer from "./store/reducers/magazine";

import { ActivityIndicator, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

const rootReducer = combineReducers({
  products: productsReducer,
  auth: authReducer,
  magazine: magazineReducer,
  location: locationReducer,
});

const middleware = [ReduxThunk];

const store = configureStore({
  reducer: rootReducer,
  devTools: true, //process.env.NODE_ENV !== 'production',
});

const App = () => {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
    search: false,
    params: null,
    origin: "Home",
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          ...prevState,
          username: action.name,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userToken: null,
          userName: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          username: action.name,
          userToken: action.token,
          isLoading: false,
        };
      case "RETREIVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "SET_SEARCH_STATE":
        return {
          ...prevState,
          search: action.search,
        };
      case "SET_PAGEPARAMS_STATE":
        return {
          ...prevState,
          params: action.params,
        };
      case "SET_ORIGIN_PAGE":
        return {
          ...prevState,
          origin: action.origin,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: async (foundUser) => {
        const userToken = String(foundUser?.idToken);
        const userName = foundUser?.email;
        if (foundUser) {
          try {
            await AsyncStorage.setItem("userToken", JSON.stringify(foundUser));
            await AsyncStorage.removeItem("validateToken");
          } catch (e) {
            console.log({ e });
          }

          dispatch({ type: "LOGIN", name: userName, token: userToken });
        }
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (e) {
          console.log({ e });
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: async (foundUser) => {
        try {
          await AsyncStorage.setItem(
            "validateToken",
            JSON.stringify(foundUser.resData)
          );
        } catch (e) {
          console.log({ e });
        }
      },
      toggleSearch: async () => {
        dispatch({ type: "SET_SEARCH_STATE", search: !loginState.search });
      },
      search: loginState.search,
      setPageParams: async (params) => {
        dispatch({ type: "SET_PAGEPARAMS_STATE", params: params });
      },
      pageParams: loginState.params,

      setPageOrigin: async (origin) => {
        dispatch({ type: "SET_ORIGIN_PAGE", origin: origin });
      },
      pageOrigin: loginState.origin,
    }),
    [loginState]
  );

  const [fontsLoaded] = useFonts({
    Kollektif_Bold: require("./assets/fonts/Kollektif-Bold.ttf"),
    Kollektif_Italic: require("./assets/fonts/Kollektif-Italic.ttf"),
    Kollektif_Bold_Italic: require("./assets/fonts/Kollektif-BoldItalic.ttf"),
    Kollektif: require("./assets/fonts/Kollektif.ttf"),
    YesevaOne: require("./assets/fonts/YesevaOne-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();

    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log({ e });
      }
      dispatch({ type: "REGISTER", token: JSON.parse(userToken) });
    }, 1000);
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  if (loginState?.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer ref={navigationRef}>
          <StatusBar style="light" />

          {loginState?.userToken !== null ? (
            <ShopTabNavigator searchState={loginState.search} />
          ) : (
            <AuthStackNavigator />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
};
export default App;
