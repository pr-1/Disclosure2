import * as Location from "expo-location";

export const SET_LOCATION = "SET_LOCATION";

export const getLocation = () => {
  return async (dispatch) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    dispatch({
      type: SET_LOCATION,
      lat: location.coords.latitude,
      long: location.coords.longitude,
    });
  };
};
