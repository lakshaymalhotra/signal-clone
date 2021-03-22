import React , {useEffect, useLayoutEffect, useState} from 'react'
import { SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View  ,ScrollView , Button} from 'react-native'
import {Avatar} from 'react-native-elements'
import {AntDesign ,SimpleLineIcons} from "@expo/vector-icons"
import CustomListItem from '../components/CustomListItem'
import {auth ,db} from '../firebase'
import { StatusBar } from 'expo-status-bar'


const HomeScreen = ({navigation}) => {
  const [chats ,setChats] =useState([]);

  useEffect(()=>{
    const unsubscribe=db.collection("chats").onSnapshot(snapshot=>
      setChats(
        snapshot.docs.map((doc)=>({
        id:doc.id,
        data:doc.data(),
      }))
    ));
    return unsubscribe;
  },[])

  const signOutuser=()=>{
    auth.signOut()
    .then(()=>{
      navigation.replace('Login')
    })
  }

    useLayoutEffect(() => {
       navigation.setOptions({
           title:'Signal',
           headerStyle:{backgroundColor:"#fff"},

           headerTitleStyle:
           {
            color:"black" ,   
          //  alignSelf: 'center',
          //  textAlign: 'center',
          //  justifyContent: 'center',
          //  flex: 1,
          //  textAlignVertical: 'center',
            },

           headerTintColor:"black",
           headerLeft: () => (
            <View style={{marginLeft:10}}>
                <TouchableOpacity 
                onPress={signOutuser}
                activeOpacity={0.5}>
                <Avatar
                rounded
                source={{
                uri: auth?.currentUser?.photoURL ||
                 'https://unsplash.com/photos/2LowviVHZ-E',
                        }}
                />
                 </TouchableOpacity>
            </View>
          ),
          headerRight:()=>(
            <View style={{
              flexDirection:'row',
              width:80,
              marginRight:20,
              justifyContent:'space-between'
            }}>
              <TouchableOpacity activeOpacity={0.5}>
                <AntDesign name='camerao' size={24} color="black"/>
              </TouchableOpacity>

              <TouchableOpacity 
              onPress={()=>navigation.navigate('AddChat')} 
              activeOpacity={0.5}>
                <SimpleLineIcons name='pencil' size={24} color="black"/>
              </TouchableOpacity>
            </View>
       ),
       })
    }, [navigation])
  const enterChat=(id , chatName)=>{
    navigation.navigate('Chat' ,{
      id:id ,
      chatName: chatName,
    })
  }

    return (
        <SafeAreaView>
          <StatusBar style='auto'/>
          <ScrollView style={styles.container}>
            {chats.map(({id, data:{chatName}})=>(

              // {console.log(chatName,id )}

              <CustomListItem id={id} key={id} chatName={chatName} enterChat={enterChat}/>
             
            ))}
           {/* <CustomListItem enterChat={enterChat} /> */}
           
          
          </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{height:"100%"}
})
