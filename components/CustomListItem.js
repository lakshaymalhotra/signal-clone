import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem , Avatar} from 'react-native-elements'

const CustomListItem = ({id , chatName , enterChat}) => {
    console.log(chatName , id)
    return (
        <ListItem key={id } bottomDivider onPress={()=>enterChat(id, chatName)}>
           <Avatar
           rounded
           source={{
             uri:
               'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
           }}
           />
           <ListItem.Content>
               <ListItem.Title style={{fontWeight:"800"}}>
                   {chatName} 
               </ListItem.Title>
               <ListItem.Subtitle numberOfLines={1}>
                   Testing
                    
                   </ListItem.Subtitle>
           </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
