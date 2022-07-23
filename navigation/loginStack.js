import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import HomeScreen from '../screens/home';
import ProfileScreen from '../screens/profile';
import WelcomeScreen from '../screens/welcome';
import BookingsScreen from '../screens/bookings';

const Stack = createNativeStackNavigator();

const LoginStack = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="BookingsScreen" component={BookingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoginStack;