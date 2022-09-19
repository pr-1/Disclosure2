import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from "../../constants/Colors";
import * as Linking from "expo-linking";


const MenuItem = props => {
    return (

        <TouchableOpacity
            style={{...props, ...styles.button}}
            onPress={()=>{
                props.external ? Linking.openURL(props.target) : props.navigation.navigate(props.target);
            }}
        >
            <Text style={styles.buttonLabel}>{props.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor:'#efefef',
        marginBottom: 5
    },
    buttonLabel: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
        paddingVertical: 12,
        paddingLeft: 18
    }
})

export default MenuItem;