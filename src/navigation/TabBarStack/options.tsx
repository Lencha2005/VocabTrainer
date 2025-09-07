import React from 'react';
import {Text, View} from 'react-native';
import {BookTab, RecommendTab, TrainingTab} from '../../assets/icons';
import {ScreenNames} from '../../constants/screenNames';
import {fonts} from '../../constants/fonts';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import TabHeader from './components/TabHeader';

const getName = (name: string) => {
  switch (name) {
    case ScreenNames.DICTIONARY_PAGE:
      return 'Dictionary';
    case ScreenNames.RECOMMEND_PAGE:
      return 'Recommend';
    case ScreenNames.TRAINING_PAGE:
      return 'Training';
  }
};

const getIcon = (name: string, focused: boolean) => {
  switch (name) {
    case ScreenNames.DICTIONARY_PAGE:
      return <BookTab isFocused={focused} />;
    case ScreenNames.RECOMMEND_PAGE:
      return <RecommendTab isFocused={focused} />;
    case ScreenNames.TRAINING_PAGE:
      return <TrainingTab isFocused={focused} />;
  }
};

export default function getTabOptions(route: any): BottomTabNavigationOptions {
  return {
    tabBarStyle: {
      height: 50,
      width: '100%',
      backgroundColor: '#85aa9f',
      paddingTop: 10,
      paddingBottom: 5,
    },
    tabBarShowLabel: false,
    header: () => <TabHeader />,
    tabBarIcon: ({focused}) => {
      return (
        <View style={{alignItems: 'center', gap: 2}}>
          {getIcon(route.name, focused)}
          <Text
            style={{
              fontFamily: fonts.MacPawFixelDisplayMedium,
              color: '#fcfcfc',
              fontSize: 10,
              opacity: focused ? 1 : 0.5,
            }}>
            {getName(route.name)}
          </Text>
        </View>
      );
    },
  };
}
