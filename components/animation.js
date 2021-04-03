import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants';
import { TouchableWithoutFeedback } from 'react-native';
import { Dimensions } from 'react-native';
import EmojiSelector ,{Categories} from 'react-native-emoji-selector'

const MessageReactions = ({sendReaction, id}) => {
   const HandleEmojiSelector=(emoji)=>{
    sendReaction(emoji, id);
   }
    const { swidth } = Dimensions.get('window')

    return (
        <View style={styles.container}> 
            <TouchableWithoutFeedback>
                <Text 
                style={{fontSize:30}}
                onPress={()=>HandleEmojiSelector('😱')}
                >
                    😱
                </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
                <Text 
                style={{fontSize:30}}
                onPress={()=>HandleEmojiSelector('😂')}
                >
                    😂
                </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
                <Text 
                style={{fontSize:30}}
                onPress={()=>HandleEmojiSelector('😍')}
                >
                    😍 
                </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
                <Text 
                style={{fontSize:30}}
                onPress={()=>HandleEmojiSelector('👍🏻')}
                >
                    👍🏻
                </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
                <Text 
                style={{fontSize:30}}
                onPress={()=>HandleEmojiSelector('❤️')}
                >
                    ❤️ 
                </Text>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default MessageReactions;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 40,
        backgroundColor:'white',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '100%',
        position:'relative',
        alignSelf:'flex-end'
    },
  
})