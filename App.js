import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./navigation/RootNavigation";
import ShopTabNavigator from "./navigation/ShopTabNavigator";
import { AuthStackNavigator } from "./navigation/StackNavigator";

import authReducer from "./store/reducers/auth";

const rootReducer = combineReducers({
  //products: productsReducer,
  auth: authReducer,
  //magazine: magazineReducer,
  //location: locationReducer
});

const middleware = [ReduxThunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...middleware)
    // other store enhancers if any
  )
);

//const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
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
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar style="light" />
        <AuthStackNavigator />
        {/* <ShopTabNavigator /> */}
      </NavigationContainer>
    </Provider>
  );
};
export default App;
