import React, { useReducer, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const DateOfBirth = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initiallyValid,
    touched: false,
  });

  const { onInputChange, id } = props;

  useEffect(
    () => {
      if (props.touched) {
        onInputChange(id, props.value, true);
      }
    },
    [props.initialValue],
    props.touched
  );

  return (
    <View style={styles.formControl}>
      {props.initialValue ? (
        <Text style={styles.label}>{props.label}</Text>
      ) : (
        <Text>''</Text>
      )}
      <View style={styles.input}>
        <TouchableOpacity onPress={props.onFocus}>
          <Text style={props.touched ? styles.inputText : styles.placeholder}>
            {props.touched && props.value
              ? props.value.toLocaleDateString()
              : "Date of Birth"}
          </Text>
        </TouchableOpacity>
      </View>
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  input: {
    //     marginBottom: 30,
    //     paddingHorizontal: 10,
    //     paddingVertical: 7,
    //     color: 'black',
    //     fontSize: 20,
    //     backgroundColor: 'white',
    //     borderRadius: 20,
    //     overflow: 'hidden'
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    // fontFamily: "open-sans",
    // color: "red",
    // fontSize: 13,
  },
  label: {
    // fontFamily: "open-sans-bold",
    // marginVertical: 8,
    // color: "#fff",
  },
  inputText: {
    color: "black",
    fontSize: 20,
  },
  placeholder: {
    color: "#aaa",
    fontSize: 20,
  },
});

export default DateOfBirth;
