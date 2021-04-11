import React , {useEffect, useLayoutEffect, useState} from 'react'
import { SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View  ,ScrollView , Button, TouchableHighlight} from 'react-native'
import {Avatar} from 'react-native-elements'
import {AntDesign ,SimpleLineIcons} from "@expo/vector-icons"
import CustomListItem from '../components/CustomListItem'
import {auth ,db} from '../firebase'
import { StatusBar } from 'expo-status-bar'
import Swipeable from 'react-native-swipeable';


const HomeScreen = ({navigation}) => {
  const [chats ,setChats] =useState([]);
  const [users,setUsers] = useState([]);
  

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
  useEffect(()=>{
    const unsubscribe=db.collection("users").onSnapshot(snapshot=>
      setUsers(
        snapshot.docs.map((doc)=>({
          data:doc.data(),
          id:doc.id,
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
                 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2978&q=80',
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
    }, [navigation, auth.currentUser.photoURL])
  
    const enterChat=(id , chatName)=>{
    navigation.navigate('Chat' ,{
      id:id ,
      chatName: chatName,
    })
  }
  const leftContent = <Text>Pull to activate</Text>;

const rightButtons = [
  <TouchableHighlight><Text>Button 1</Text></TouchableHighlight>,
  <TouchableHighlight><Text>Button 2</Text></TouchableHighlight>
];

    return (
        <SafeAreaView>
          <StatusBar style='auto'/>
          <ScrollView style={styles.container}>
            {chats.map(({id, data:{chatName}})=>(

              // {console.log(chatName,id )}

              <CustomListItem id={id} key={id} chatName={chatName} enterChat={enterChat}/>
             
            ))}
             {/* <Swipeable leftContent={leftContent} rightButtons={rightButtons}>
      <Text>My swipeable content</Text>
    </Swipeable> */}
           <CustomListItem enterChat={enterChat} />
          
          </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{height:"100%"}
})
