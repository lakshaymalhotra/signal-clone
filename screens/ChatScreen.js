import React, { useEffect, useLayoutEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View ,TouchableWithoutFeedback  ,Image} from 'react-native'
import { Avatar } from 'react-native-elements'
import {AntDesign ,SimpleLineIcons , FontAwesome , Ionicons} from "@expo/vector-icons"
import { SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView } from 'react-native'
import { ScrollView, TextInput, } from 'react-native'
import { Keyboard } from 'react-native'
import { db , auth} from '../firebase'
import * as firebase from "firebase"
import * as ImagePicker from 'expo-image-picker';
import MessageReactions from '../components/animation';


const ChatScreen = ({navigation , route}) => {
    const [input , setInput]=useState("");
    const[ messages , setMessages]=useState([]);
    const [currentSelected , setCurrentSelected]=useState(null);
    let currentImage=null;

    const sendReaction= async (emoji='😂',  id)=>{
        await db.collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .doc(id)
        .update({
            messageReaction: emoji
        })
        console.log("FIeld added");
    }
        const handleSelection=(id)=>{
            setCurrentSelected(id)
        }
    
        useLayoutEffect(()=>{
            const unsubscribe=db.collection('chats')
            .doc(route.params.id)
            .collection('messages')
            .orderBy('timestamp' )
            .onSnapshot((snapshot)=>setMessages(
                snapshot.docs.map(doc=>({
                    id:doc.id,
                    data : doc.data()
                }))
                ))
                // .then(()=>{console.log(messages)})
                return unsubscribe;
                
        },[route])
    
        useLayoutEffect(()=>{
            navigation.setOptions({
                title:"Chat",
                headerTitleAlign:"left",
                headerStyle:{backgroundColor:"#2C6BED"},
                headerTitleStyle:
                {
                 color:"black" ,   
                 },
                headerTintColor:"black",
                headerTitle:()=>(
                    <View 
                    style={{
                        flexDirection:"row",
                        alignItems:"center",
                        color:'black'
                    }}>
                        <Avatar rounded source={{
                            uri:"https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                        }}/>
                        <Text style={{color:"white" , marginLeft:10 , fontWeight:"700"}}>
                            {route.params.chatName}
                        </Text>
                    </View>
                ),
                headerRight:()=>{
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-between',
                        width:80,
                        marginRight:20
                    }}>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="black"/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="black"/>
                    </TouchableOpacity>
    
                    </View>
                   
                }
            });
        },[])

    // yha changes krne honge
    const sendMessage=async ()=>{

        Keyboard.dismiss();
        // console.log(selectedImage)
         await db.collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .add
        ({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email : auth.currentUser.email,
            photoURL : auth.currentUser.photoURL,
            uri : currentImage,
            

        })
        .then(() => {
        setInput('')
        currentImage=null;
        })
        .catch((error) => {
                console.error("Error writing document: ", error);
            });
            
        

    }
   

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
    
    console.log("image picker  "+pickerResult.uri)
    const result=await uploadImage(pickerResult.uri)
    let imageRef = firebase.storage().ref('chats/signal-clone10');
    let downloadedURL= await imageRef.getDownloadURL();
    currentImage={imageUri:downloadedURL};

    sendMessage();
  };
  const uploadImage = async(uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase.storage().ref('chats/').child('signal-clone10');
    return ref.put(blob).then((snapshot)=>{console.log("updated")});
  }
  
  
    return (
        <SafeAreaView style={{
            flex:1,
            backgroundColor:'white'
        }}>
            <StatusBar style='light'/>
            <KeyboardAvoidingView style={styles.container}>
                <>
                {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}/> */}
                <ScrollView>
                    {messages.map(({id , data})=>(
                        // console.log('********'),
                        // console.log(data.uri),
                        data.email === auth.currentUser.email?(
                            <View key={id} style={styles.reciever}>
                                    <Avatar  
                                      position="absolute"
                                      // WEB
                                      containerStyle={{
                                        bottom: -15,
                                        right:-5,
                                        position:"absolute"
                                      }}
                                      bottom={-15}
                                      right={-5}
                                      rounded
                                      size={30} 
                                      source={{
                                      uri:data.photoURL,
                                    }}/>
                                    {data.messageReaction && data.messageReaction!=="" &&
                                    <Text style={styles.messageReact}>
                                        {data.messageReaction}
                                    </Text>
                                    }
                                    <TouchableOpacity 
                                    onLongPress={()=>handleSelection(id)}
                                    onPress={()=>handleSelection(null)}
                                    >
                                    <Text style={styles.recieverText}>{data.message}</Text>
                                    {data.uri && <Image source={{
                                        uri:data.uri.imageUri
                                    }}
                                     style={{height:100 , width:100  , backgroundColor:'grey'}}/>} 
                                    {currentSelected===id && 
                                    <MessageReactions 
                                    sendReaction={sendReaction}
                                    id={id}
                                    />}
                                    </TouchableOpacity>
                                    {}
                                    
                            </View>
                        ):(
                                <View key={id}style={styles.sender}>
                                    <Avatar
                                    position="absolute"
                                    // WEB
                                    containerStyle={{
                                      bottom: -15,
                                      left:-5,
                                      position:"absolute"
                                    }}
                                    bottom={-15}
                                    left={-5}
                                    rounded
                                    size={30} 
                                    source={{
                                    uri:data.photoURL,
                                  }}/>
                                    <Text style={styles.senderText}>{data.message}</Text>
                                   
                                </View>
                            )
                        
                    ))
                                }
                   
                </ScrollView>
                <View style={styles.footer}>
              
                <TextInput 
                    value={input}   
                    onChangeText={text=>setInput(text)} 
                    placeholder="Signal Message" 
                    style={styles.textInput}
                    onSubmitEditing={sendMessage}
                />
                    <View style={styles.shareBox}>
                    <TouchableOpacity onPress={openImagePickerAsync} activeOpacity={0.5}>
                        <AntDesign name="picture" size={24} color="#2B68E6"/>
                    </TouchableOpacity>
                
                    <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                        <Ionicons name="send" size={24} color="#2B68E6"/>
                    </TouchableOpacity>
                    
                    </View>
                </View>
                {/* <TouchableWithoutFeedback/> */}
                
                </>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    messageReact:{
        bottom: -10,
        position:"absolute",
    },
    container:{
        flex:1,
        // flexDirection:'column-reverse',
        // alignSelf:'flex-start'
        // backgroundColor:"pink"
    },
    footer:{
        flexDirection:"row",
        alignItems:"center",
        width:"100%",
        padding:15,
    },
    textInput:{
        bottom:0,
        flex: 1,
        borderColor:"transparent",
        backgroundColor:"#ECECEC",
        marginRight:15,
        height:40,
        padding:10,
        color:"grey",
        borderRadius:35
    },
    reciever:{
        padding:15 , 
        backgroundColor:"#ECECEC",
        alignSelf:'flex-end',
        borderRadius:20,
        marginRight:15,
        marginBottom:20 ,
        maxWidth:"80%",
        position:"relative",
      
    },
    sender:{
        padding:15 , 
        backgroundColor:"#2B68E6",
        alignSelf:'flex-start',
        borderRadius:20,
        marginRight:15,
        marginBottom:20 ,
        maxWidth:"80%",
        position:"relative",
    },
    shareBox:{
        
        flexDirection:'row',
        alignSelf:'flex-start',
        paddingTop:10,
        
    },
    thumbnail: {
        width: 300,
        height: 300,
        resizeMode: "contain"
      }
})
