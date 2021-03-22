import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input , Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
import { db } from '../firebase';

const AddChat = ({navigation}) => {

    const createChat=async ()=>{
       
        await db
        .collection('chats')
        .add({
            chatName: inputchat,
        })
        .then(()=>{
            navigation.goBack()
        })
        .catch((error)=>alert(error)); 
    }
    
    const [inputchat , setInputchat]=useState('');

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"Add a new chat",
            alignSelf: 'center',
        })
    },[navigation])
    return (
        <View style={styles.container}>
           <Input placeholder="Enter a chat name"

           onChangeText={(text)=>setInputchat(text)}

           value={inputchat}
           leftIcon={
               <Icon name="wechat" type="antdesign" size={24} color="black"/>
           }
           />
           <Button title="Create new chat" onPress={createChat}/>
        </View>
    )
}

export default AddChat

const styles = StyleSheet.create({
    container:{
        padding:30,
        height:"100%",
        backgroundColor:'white'

    }
})
