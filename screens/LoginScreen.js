import React , {useState , useEffect} from 'react'
import { StyleSheet, Text, View , KeyboardAvoidingView , Image } from 'react-native'
import { Button , Input } from 'react-native-elements';
import {StatusBar} from "expo-status-bar";
import  { auth } from '../firebase';





const LoginScreen = ({navigation}) => {
    const [email , setEmail]=useState("");
    const [password , setPassword]=useState("");
    const signIn=()=>{
        auth.signInWithEmailAndPassword(email, password)
        .catch(error=>alert(error));
    }
    const register=()=>{}

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user=>{
           if(user!=null){
               console.log("we are authenticated ")
               navigation.replace('Home');
           }
       });
       return unsubscribe;
    }, [])
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style="light" />
            <Image
            source={
                // uri:"/https://blog.mozilla.org/internetcitizen/2018/08/07/privacy-apps/signal-logo/",
                require('../assets/pictures/logo.png') 
            }
            style={{width:200 , height:200 , marginBottom:10}}
            />
            <View style={styles.inputContainer}>
                <Input 
                placeholder="Email" 
                 type="Email"
                onChangeText={(text)=>setEmail(text)}
                />
                <Input 
                placeholder="Password"  
                type="Password" 
                secureTextEntry={true}
                onChangeText={(text)=>setPassword(text)}
                />
                <Button 
                title="Login" 
                onPress={signIn}
                containerStyle={styles.button}
                
                />
                <Button 
                title="Register" 
                onPress={()=>navigation.navigate('Register') }
                containerStyle={styles.button}
                type='outline'
                />
            </View>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        backgroundColor:'white'

    },
    inputContainer:{
width:300
    },
    button:{
        width:200,
        marginTop:10,
        justifyContent:'center'

    }
})

