import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ScreenNames} from '../constants/screenNames';
import {RootStackNavigation} from './types';
import LoggedInStack from './LoggedInStack';
import LoggedOutStack from './LoggedOutStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigationRef} from './components/NavigationRef';

const Stack = createNativeStackNavigator<RootStackNavigation>();

export default function RootNavigation() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkAuth();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={
          isLoggedIn
            ? ScreenNames.LOGGED_IN_STACK
            : ScreenNames.LOGGED_OUT_STACK
        }
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={ScreenNames.LOGGED_IN_STACK}
          component={LoggedInStack}
        />
        <Stack.Screen
          name={ScreenNames.LOGGED_OUT_STACK}
          component={LoggedOutStack}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
