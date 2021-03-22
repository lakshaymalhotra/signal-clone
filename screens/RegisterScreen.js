import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import React, { useState , useLayoutEffect } from 'react'
import { StyleSheet,  View , KeyboardAvoidingView} from 'react-native'
import { Input , Button, Text} from 'react-native-elements'
import {auth } from '../firebase'


const RegisterScreen = ({navigation}) => {
    const [name , setName]=useState("");
    const [email , setEmail]=useState("");
    const [password , setPassword]=useState("");
    const [imageUrl , setImageUrl]=useState("");

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerBackTitle:"Login Page"
        })
    },[navigation])

    const register=()=>{
        auth.createUserWithEmailAndPassword(email , password)
        .then((authUser)=>{
            authUser.user.updateProfile({
                displayName: name,
                photoURL : imageUrl ||
                 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
            })
        })
        .catch((error)=>alert(error.message));
    }
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light'/>
            <Text style={{fontSize:25 ,marginBottom:28}}>Create a Signal Account</Text>
            <View style={styles.inputContainer}>
            <Input
            placeholder='Full Name'
             type='text'
            onChangeText={(text)=>setName(text)}
            />
            <Input
            placeholder='Email'
             type='Email'
            onChangeText={(text)=>setEmail(text)}
            />
            <Input
            placeholder='Password'
            secureTextEntry
             type='Password'
            onChangeText={(text)=>setPassword(text)}
            />
            <Input
            placeholder='Profile Picture Url'
             type='text'
            onChangeText={(text)=>setImageUrl(text)}
            onSubmitEditing={register}
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
    button:{
        width:200,
        marginTop:10
    },
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        backgroundColor:'white'
    },
    inputContainer:{
        width:300
    }
})
