import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import SigninScreen from '../screens/signin';
import LoginScreen from '../screens/login';
import WelcomeScreen from '../screens/welcome';
import HomeScreen from '../screens/home';
import ProfileScreen from '../screens/profile';


const Stack = createNativeStackNavigator();

const LogoutStack = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="SigninScreen" component={SigninScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LogoutStack;