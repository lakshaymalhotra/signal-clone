import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import React, { useState, useLayoutEffect } from 'react'
import { StyleSheet, View, KeyboardAvoidingView , Alert} from 'react-native'
import { Input, Button, Text } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import { db, auth } from '../firebase'
import * as firebase from "firebase"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'


const RegisterScreen = ({ navigation, route }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [downloadedUri, setDownloadedUri] = useState(null);
    const [profileUri, setProfileUri] = useState(null);
    const [isProfile, setIsProfile] = useState(false);
  


    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Login Page"
        })
    }, [navigation])

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true) {
            return;
        }
        setIsProfile(true);
        setProfileUri(pickerResult.uri);


        // const result=await uploadImage(pickerResult.uri)
        // let imageRef = firebase.storage().ref('chats/signal-clone10');
        // let downloadedURL= await imageRef.getDownloadURL();
        // currentImage={imageUri:downloadedURL};


    };

    const uploadImage = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        var ref = firebase.storage().ref('profilePicture/').child(`image${auth.currentUser.uid}`);
        return ref.put(blob).then((snapshot) => { console.log("updated") });
    }
    const createUser=async (id)=>{
       
        await db
        .collection('Users')
        .add({
            userID: id,
            displayName: name,
            photoURL:'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'

        })
        .catch((error)=>alert(error)); 
    }
    const ButtonAlert = () =>
    Alert.alert(
      "User Registered",
      "Your account has been created. Please login to continue.",
      [
        { text: "OK", onPress: () =>  navigation.replace('Login') }
      ]
    );
    

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(async (authUser) => {
                console.log("step0")
                 await createUser(authUser.user.uid)
            })
            .then(async () => {
                console.log("step 1")
                await uploadImage(profileUri)
            })
            .then(async () => {
                console.log("step2")
                let imageRef = firebase.storage().ref(`profilePicture/image${auth.currentUser.uid}`);
                let downloadUrl = await imageRef.getDownloadURL();
                
                // console.log(auth.currentUser);
                await auth.currentUser.updateProfile({
                    photoURL: downloadUrl
                })
               ButtonAlert();
               route.params.info.SetFromRegistered(true);

            })
            .catch((error) => alert(error.message));
        // navigation.navigate('Login');
    }
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light' />

            <Text style={{ fontSize: 25, marginBottom: 28 }}>Create a Signal Account</Text>

            <TouchableOpacity
                onPress={openImagePickerAsync}
                style={{
                    height: 100, width: 100,
                    backgroundColor: '#d3e0ea', borderRadius: 50,
                    justifyContent: 'center', alignItems: 'center'
                }}>
                {!isProfile && <MaterialCommunityIcons
                    name="camera"
                    size={34}
                />}

                {profileUri &&
                    <Image source={{ uri: profileUri }}
                        style={{ height: 100, width: 100, borderRadius: 50 }} />}
            </TouchableOpacity>

            <Button />

            <View style={styles.inputContainer}>
                <Input
                    placeholder='Full Name'
                    type='text'
                    onChangeText={(text) => setName(text)}
                />
                <Input
                    placeholder='Email'
                    type='Email'
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder='Password'
                    secureTextEntry
                    type='Password'
                    onChangeText={(text) => setPassword(text)}
                />

            </View>
            <Button
                title="Register"
                containerStyle={styles.button}
                onPress={register}
                raised
            />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    button: {
        width: 200,
        marginTop: 10
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    inputContainer: {

        width: 300,
        marginTop: 15
    }
})
