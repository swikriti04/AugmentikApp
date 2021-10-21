import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { Verification } from './components/Verification';
import { Inspection } from './components/Inspection';
import { ProSelection } from './components/ProSelection';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const myOptions = {
  title: "Login",
  headerTintColor: "White",
  headerStyle: {
    backgroundColor: "#f4a460",
  },
}

const LoginScreen = ({ navigation, route}) => {
  //console.log(navigation)
  return (
    <Login navigation={navigation} route={route}/>
  )
}

const signUpScreen = ({ navigation, route}) => {
  //console.log(navigation)
  return (
    <SignUp navigation={navigation} route={route}/>
  )
}

const VeriScreen = ({ navigation, route}) => {
  //console.log(navigation)
  return (
    <Verification navigation={navigation} route={route}/>
  )
}

const InspScreen = ({ navigation, route}) => {
  //console.log(navigation)
  return (
    <Inspection navigation={navigation} route={route}/>
  )
}

const ProScreen = ({ navigation, route}) => {
  //console.log(navigation)
  return (
    <ProSelection navigation={navigation} route={route}/>
  )
}

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} options = {myOptions}/>
          <Stack.Screen name="signUp" component={signUpScreen} options= {{...myOptions, title:"Sign Up"}}/>
          <Stack.Screen name="Verification" component={VeriScreen} options= {{...myOptions, title:"Verification"}}/>
          <Stack.Screen name="Inspection" component={InspScreen} options= {{...myOptions, title:"Inspection"}}/>
          <Stack.Screen name="ProSelect" component={ProScreen} options= {{...myOptions, title:"Proposal"}}/>
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
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
