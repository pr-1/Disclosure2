import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Button,
    Image,
    StyleSheet,
    Alert,
    TouchableOpacity,
    Platform,
    TouchableHighlight, Modal
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from "../../constants/Colors";
import {CAMERA_ROLL} from "expo-permissions";

const ImageSelector = props => {
    const [modalVisible, setModalVisible] = useState(false);
    const [pickedImage, setPickedImage] = useState(null);
    const [imageExists, setImageExists] = useState(false);
    const verifyPermissions = async () => {
        const { status: cameraPermission } = await Permissions.askAsync(Permissions.CAMERA, CAMERA_ROLL);
        if (cameraPermission !== 'granted') {
            Alert.alert('Insufficient permissions!', 'You need to grant permissions to use this app',[{text: 'OK'}]);
            return false;
        }
        return true;
    };
    useEffect(()=>{
        if (props.imageUri !== null) {
            setImageExists(true);
            setPickedImage(props.imageUri);
        }
    }, [props.imageUri, setImageExists, setPickedImage]);

    const pickImage = async () => {
        let image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 0.5,
        });
        if (!image.cancelled) {
            setImageExists(true);
            setPickedImage(image.uri);
            setModalVisible(false);
            props.onImageTaken(image.uri);
        }
    };

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) { return; }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [3,3],
            quality: 0.5
        });

        setImageExists(true);
        setPickedImage(image.uri);
        setModalVisible(false);
        props.onImageTaken(image.uri);
    };

    return (
        <View style={styles.profileContainer}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.modalViewInner}>
                            <View style={styles.closeButton}>
                                <TouchableOpacity
                                    style={styles.closeButtonContainer}
                                    onPress={() => {
                                        setModalVisible(!modalVisible);
                                    }}>
                                    <Text style={styles.closeTextStyle}>X</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                onPress={pickImage}
                            >
                                <Text style={styles.button}> Select Image from Gallery </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={takeImageHandler}
                            >
                                <Text style={styles.button}>  or use Camera </Text>
                            </TouchableOpacity>


                        </View>
                    </View>
                </View>
            </Modal>
            {imageExists ?
                (
                    <View style={styles.initialContainer}>
                        <Image
                            source={{uri: pickedImage} }
                            style={styles.profileImage}
                        />
                    </View>
                ) : (
                    <View style={styles.initialContainer}>
                        <Text style={styles.initials}>{props.initials}</Text>
                    </View>
                )
            }
            <View>
                <TouchableOpacity
                    style={styles.button2}
                    onPress={() => {
                        setModalVisible(true);
                    }}
                >
                    <Text style={styles.buttonLabel}> Select new image </Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    imagePicker:{
        alignItems: 'center',
        marginBottom: 15
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    image:{
        height: '100%',
        width: '100%'
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    initialContainer: {
        height: 100,
        width: 100,
        backgroundColor: '#ccc',
        borderRadius: 100,
        overflow: 'hidden',
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.accent,
        borderWidth: 1,
        alignSelf: 'center'
    },
    initials: {
        color: 'white',
        fontSize: 50,
        fontFamily: 'palatino-bold',
        marginBottom: Platform.OS === 'android' ? 30 : 0,
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 20
    },
    profileImage:{
        width: '100%',
        height: '100%',
        resizeMode:'contain'
    },
    buttonLabel: {
        color: 'white',
        fontFamily: 'open-sans-bold',
        fontSize: 15
    },
    closeButtonContainer: {
        borderColor: Colors.accent,
        borderWidth: 1,
        borderRadius: 100,
        overflow: 'hidden',
        paddingHorizontal: 7
    },
    closeButton: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 20
    },
    button: {
        color: 'white',
        marginBottom: 20,
        backgroundColor: Colors.accent,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        elevation: 2,
    },
    button2: {
        alignItems: 'center',
        backgroundColor: Colors.black,
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: '100%',
        borderColor: Colors.accent,
        borderWidth: 1
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },

    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: 250,
        height: 200,

    },
    modalViewInner: {
        width: '98%',
        height: '98%',
        borderColor: Colors.accent,
        borderWidth: 1,
        borderRadius: 20,
        paddingTop: 5,
        paddingHorizontal: 20,
        marginTop: 3,
        alignItems: 'center'
    },

    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    closeTextStyle: {
        color: 'black',
        textAlign: 'center',
        fontSize: 20
    },
    modalText: {

        textAlign: 'center',
    },
    openButton: {
        borderRadius: 20,
        paddingHorizontal: 10,
        elevation: 2,
    },

})

export default ImageSelector;