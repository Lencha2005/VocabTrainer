import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ScreenNames} from '../../constants/screenNames';
import {LoggedInStackType} from '../types';
import TabBarStack from '../TabBarStack';
import AddWordPage from '../../screen/AddWord';
import TabHeader from '../TabBarStack/components/TabHeader';

const Stack = createNativeStackNavigator<LoggedInStackType>();

export default function LoggedInStack() {
  return (
    <Stack.Navigator initialRouteName={ScreenNames.TAB_BAR_STACK}>
      <Stack.Screen
        name={ScreenNames.TAB_BAR_STACK}
        component={TabBarStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreenNames.ADD_WORD_PAGE}
        component={AddWordPage}
        options={{
          header: () => <TabHeader />,
        }}
      />
    </Stack.Navigator>
  );
}
