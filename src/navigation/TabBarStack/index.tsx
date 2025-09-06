import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React, {useCallback} from 'react';
import {ScreenNames} from '../../constants/screenNames';
import Dictionary from '../../screen/Dictionary';
import {TabBarStackType} from '../types';
import Recommend from '../../screen/Recommend';
import Training from '../../screen/Training';
import getTabOptions from './options';
import {RouteProp} from '@react-navigation/native';

const Tab = createBottomTabNavigator<TabBarStackType>();

export default function TabBarStack() {
  const tabOptions = useCallback(
    (
      route: RouteProp<TabBarStackType, keyof TabBarStackType>,
    ): BottomTabNavigationOptions => {
      return getTabOptions(route);
    },
    [],
  );

  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.DICTIONARY_PAGE}
      screenOptions={({route}) => tabOptions(route)}>
      <Tab.Screen name={ScreenNames.DICTIONARY_PAGE} component={Dictionary} />
      <Tab.Screen name={ScreenNames.RECOMMEND_PAGE} component={Recommend} />
      <Tab.Screen name={ScreenNames.TRAINING_PAGE} component={Training} />
    </Tab.Navigator>
  );
}
