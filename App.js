import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import Home from './screens/HomeScreen'
import {createStackNavigator} from "@react-navigation/stack"
import RegisterScreen from './screens/RegisterScreen';
import AddChat from './screens/AddChat';
import ChatScreen from './screens/ChatScreen'
import { Button } from 'react-native-elements/dist/buttons/Button';
import { TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MessageReactions from './components/animation'


const Stack= createStackNavigator();

const globalScreenOptions={

  headerStyle:{ backgroundColor:"#2C6BED"},
  headerTitleStyle :{color:"white" , alignSelf:'center' },
  headerTintColor :"white"
}
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={globalScreenOptions}>
    <Stack.Screen name='Login' component={LoginScreen}/>
    <Stack.Screen name='Home' component={Home}
    // options={{headerBackTitle:'Login}}
    />
    <Stack.Screen name='Register' component={RegisterScreen}/>
    <Stack.Screen name='AddChat' component={AddChat} />
    <Stack.Screen name='Chat' component={ChatScreen} />

    </Stack.Navigator>
    </NavigationContainer>
    // <MessageReactions/>
   
   
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
