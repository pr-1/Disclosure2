export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const VALIDATE = "VALIDATE";
import mime from "mime";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Apikey from "../../constants/Apikey";

const API_URL = "https://app.disclosurediscounts.co.uk/api/v2";
const apiKey = Apikey.apiKey;
let timer;

export const authenticate = (
  userId,
  token,
  email,
  phone,
  fname,
  lname,
  postcode,
  imageUri,
  dob,
  gender,
  mailingList,
  expires,
  createdOn
) => {
  return (dispatch) => {
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token,
      email: email,
      phone: phone,
      fname: fname,
      lname: lname,
      postcode: postcode,
      imageUri: imageUri,
      dob: dob,
      gender: gender,
      mailingList: mailingList,
      expires: expires,
      createdOn: createdOn,
    });

    return null;
  };
};

export const reRegister = (foundUser) => {
  console.log({ foundUser });
  return async (dispatch) => {
    dispatch(
      authenticate(
        foundUser.localId,
        foundUser.idToken,
        foundUser.email,
        foundUser.phone,
        foundUser.fname,
        foundUser.lname,
        foundUser.postcode,
        foundUser.image_uri,
        foundUser.dob,
        foundUser.gender,
        foundUser.mailingList,
        foundUser.expires,
        foundUser.created_at
      )
    );
  };
};

export const update = (
  fname,
  lname,
  email,
  phone,
  userId,
  token,
  postcode,
  imageUri,
  image_changed,
  dob,
  gender,
  mailingList
) => {
  return async (dispatch) => {
    if (image_changed) {
      const newImageUri = "file:///" + imageUri.split("file:/").join("");
      let base_url =
        "https://app.disclosurediscounts.co.uk/api/imageupload.php";
      let uploadData = new FormData();
      uploadData.append("file", {
        name: newImageUri.split("/").pop(),
        type: mime.getType(newImageUri),
        uri: newImageUri,
      });
      fetch(base_url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        method: "POST",
        body: uploadData,
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.status) {
            imageUri = response.imagepath;

            fetch(`${API_URL}/users/update/${userId}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
                "Accept-Encoding": "gzip,deflate,br",
                Connection: "keep-alive",
                apiKey: apiKey,
                token: token,
              },
              body: JSON.stringify({
                fname: fname,
                lname: lname,
                email: email,
                phone: phone,
                postcode: postcode,
                image_uri: imageUri,
                dob: dob,
                gender: gender,
                mailingList: mailingList,
              }),
            })
              .then((newResponse) => newResponse.json())
              .then((newResponse) => {
                dispatch(
                  authenticate(
                    newResponse.localId,
                    newResponse.idToken,
                    newResponse.email,
                    newResponse.phone,
                    newResponse.fname,
                    newResponse.lname,
                    newResponse.postcode,
                    newResponse.image_uri,
                    newResponse.dob,
                    newResponse.gender,
                    newResponse.mailingList,
                    newResponse.expires
                  )
                );
                saveDataToStorage(
                  newResponse.idToken,
                  newResponse.localId,
                  newResponse.fname,
                  newResponse.lname,
                  newResponse.phone,
                  newResponse.email,
                  newResponse.postcode,
                  newResponse.image_uri,
                  newResponse.dob,
                  newResponse.gender,
                  newResponse.mailingList,
                  newResponse.expires
                );
              });
          } else {
            Alert.alert("Error", response.message);
          }
        })
        .catch(() => {
          Alert.alert("Error", "Error on network");
        });
    } else {
      const response = await fetch(`${API_URL}/users/update/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "Accept-Encoding": "gzip,deflate,br",
          Connection: "keep-alive",
          apiKey: apiKey,
          token: token,
        },
        body: JSON.stringify({
          fname: fname,
          lname: lname,
          email: email,
          phone: phone,
          postcode: postcode,
          image_uri: imageUri,
          dob: dob,
          gender: gender,
          mailingList: mailingList,
        }),
      });

      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;

        let message = "Something went wrong";
        if (errorResData.error === "Invalid User Token") {
          message = "Invalid User Token";
        }

        if (errorId === "EMAIL_EXISTS") {
          message = "This email exists already";
        }

        throw new Error(message);
      }

      const resData = await response.json();

      dispatch(
        authenticate(
          resData.localId,
          resData.idToken,
          resData.email,
          resData.phone,
          resData.fname,
          resData.lname,
          resData.postcode,
          resData.image_uri,
          resData.dob,
          resData.gender,
          resData.mailingList,
          resData.expires,
          resData.created_at
        )
      );

      saveDataToStorage(
        resData.idToken,
        resData.localId,
        resData.fname,
        resData.lname,
        resData.phone,
        resData.email,
        resData.postcode,
        resData.image_uri,
        resData.dob,
        resData.gender,
        resData.mailingList,
        resData.expires,
        resData.created_at
      );
    }
  };
};

export const signup = (
  fname,
  lname,
  email,
  phone,
  password,
  postcode,
  dob,
  gender,
  mailingList
) => {
  return async (dispatch) => {
    const response = await fetch(`${API_URL}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Accept-Encoding": "gzip,deflate,br",
        Connection: "keep-alive",
        apiKey: apiKey,
      },
      body: JSON.stringify({
        fname: fname,
        lname: lname,
        email: email,
        phone: phone,
        password: password,
        postcode: postcode,
        dob: dob,
        gender: gender,
        mailingList: mailingList,
      }),
    });

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;

      let message = "Something went wrong";

      if (errorId === "EMAIL_EXISTS") {
        message = "This email exists already";
      }

      throw new Error(message);
    } else {
      const resData = await response.json();

      console.log({ resData });

      return { resData };
    }
  };
};

export const verifyCode = (code) => {
  return async (dispatch) => {
    const response = await fetch(`${API_URL}/users/verifycode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Accept-Encoding": "gzip,deflate,br",
        Connection: "keep-alive",
        apiKey: apiKey,
      },
      body: JSON.stringify({
        code: code,
      }),
    });

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;

      let message = "Something went wrong";

      if (errorId === "INVALID_CODE") {
        message = "Invalid code";
      }
      throw new Error(message);
    } else {
      const resData = await response.json();

      dispatch(
        authenticate(
          resData.localId,
          resData.idToken,
          resData.email,
          resData.phone,
          resData.fname,
          resData.lname,
          resData.postcode,
          resData.image_uri,
          resData.dob,
          resData.gender,
          resData.mailingList,
          resData.expires,
          resData.created_at
        )
      );
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(`${API_URL}/users/login`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Accept-Encoding": "gzip,deflate,br",
        Connection: "keep-alive",
        apiKey: apiKey,
      },
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    console.log({ response });

    if (!response.ok) {
      const errorResData = await response.json();

      const errorId = errorResData.error.message;
      let message = "Something went wrong";

      if (errorId === "EMAIL_NOT_FOUND") {
        message = "Email or Password are incorrect";
      } else if (errorId === "USER_NOT_ACTIVE") {
        message = "User not active - please contact support";
      }

      throw new Error(message);
    } else {
      const resData = await response.json();
      console.log({ resData });

      dispatch(
        authenticate(
          resData.localId,
          resData.idToken,
          resData.email,
          resData.phone,
          resData.fname,
          resData.lname,
          resData.postcode,
          resData.image_uri,
          resData.dob,
          resData.gender,
          resData.mailingList,
          resData.expires,
          resData.created_at
        )
      );
      return { resData };
    }
  };
};
export const resetPassword = (email) => {
  return async (dispatch) => {
    const response = await fetch(`${API_URL}/users/reset/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Accept-Encoding": "gzip,deflate,br",
        Connection: "keep-alive",
        apiKey: apiKey,
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    if (!response.ok) {
      const errorResData = await response.json();

      const errorId = errorResData.error.message;
      let message = "Something went wrong";

      if (errorId === "EMAIL_NOT_FOUND") {
        message = "Email or Password are incorrect";
      } else if (errorId === "USER_NOT_ACTIVE") {
        message = "User not active - please contact support";
      }

      throw new Error(message);
    }
    const resData = await response.json();
    console.log({ resData });
  };
};

export const changePassword = (password1, token) => {
  return async (dispatch) => {
    const response = await fetch(`${API_URL}/users/changepassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Accept-Encoding": "gzip,deflate,br",
        Connection: "keep-alive",
        apiKey: apiKey,
        token: token,
      },
      body: JSON.stringify({
        password: password1,
      }),
    });

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;

      let message = "Something went wrong";

      if (errorId === "Invalid User Token") {
        message = "Invalid User Token";
      }

      throw new Error(message);
    }

    const resData = await response.json();

    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        resData.email,
        resData.phone,
        resData.fname,
        resData.lname,
        resData.postcode,
        resData.image_uri,
        resData.dob,
        resData.gender,
        resData.mailingList,
        resData.expires,
        resData.created_at
      )
    );

    saveDataToStorage(
      resData.idToken,
      resData.localId,
      resData.fname,
      resData.lname,
      resData.phone,
      resData.email,
      resData.postcode,
      resData.image_uri,
      resData.dob,
      resData.gender,
      resData.mailingList,
      resData.expires,
      resData.created_at
    );
  };
};
export const deleteProfile = (token) => {
  return async (dispatch) => {
    const response = await fetch(`${API_URL}/users/deleteprofile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Accept-Encoding": "gzip,deflate,br",
        Connection: "keep-alive",
        apiKey: apiKey,
        token: token,
      },
    });

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;

      let message = "Something went wrong";

      if (errorId === "Invalid User Token") {
        message = "Invalid User Token";
      }

      throw new Error(message);
    }

    const resData = await response.json();
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userDataUniqueKey");
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout();
  }
};

const saveDataToStorage = (
  token,
  userId,
  fname,
  lname,
  phone,
  email,
  postcode,
  imageUri,
  dob,
  gender,
  mailingList,
  expires,
  createdOn
) => {
  AsyncStorage.setItem(
    "userDataUniqueKey",
    JSON.stringify({
      token: token,
      userId: userId,
      email: email,
      fname: fname,
      lname: lname,
      phone: phone,
      postcode: postcode,
      imageUri: imageUri,
      dob: dob,
      gender: gender,
      mailingList: mailingList,
      expires: expires,
      createdOn,
    })
  );
};
